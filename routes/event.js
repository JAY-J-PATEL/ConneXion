const express = require('express');
const router = express.Router();
const Event = require("../models/event.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {eventSchema, insightSchema} = require("../schema.js");

const {isLoggedIn, saveRedirectUrl, isOwner, validateEvent, validateInsight, isInsightProvider, checkGenre} = require("../middleware.js");



// ----------EVENTS PART START-------------------------------------



// _______send request to event route


router.get("/", isLoggedIn, checkGenre, wrapAsync(async(req, res) => {
    const allEvents = await Event.find({});
    res.render("events/events.ejs", {allEvents});
}));



router.get("/new", isLoggedIn,  (req, res) => {
    // console.log(req.user);
    
    res.render("events/newEvent.ejs");
})

// ___________ show event

router.get("/:id", wrapAsync(async(req, res) => {
    let {id} = req.params;
    const event = await Event.findById(id).populate({path: "insights", populate: {path: "insightProvider"}}).populate("host");
    if(!event) {
        req.flash("error", "event you requested for does not exist");
        return res.redirect("/events");
    }   
    res.render("events/showEvent.ejs", {event});
}));





// create or new event

router.post("/", isLoggedIn, validateEvent, wrapAsync(async(req, res, next) => {
    let event = req.body.event;
    const newEvent = new Event(event);
    newEvent.host = req.user._id;
    await newEvent.save();
    req.flash("success", "New Event Posted");
    res.redirect("/events");
}));


// update route

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async(req, res) => {
    let {id} = req.params;
    const event = await Event.findById(id);
    if(!event) {
        req.flash("error", "event you requested for does not exist");
        return res.redirect("/events");
    }
    res.render("events/editEvent.ejs", {event});
}));


router.put("/:id", isLoggedIn, isOwner, validateEvent, wrapAsync(async(req, res) => {
    if(!req.body.event) {
        throw new ExpressError(400, "Send valid data for event");
    }
    let {id} = req.params;
    // let event = await Event.findById(id);
    // if(!event.host._id.equals(res.locals.currUser._id)) {
    //     req.flash("error", "You don't have permission to edit");
    //     return res.redirect(`/events/${id}`);
    // }

    // insted of this we userd middleware isOwner
    await Event.findByIdAndUpdate(id, {...req.body.event});
    req.flash("success", "Event Updated Successfully!");
    res.redirect(`/events/${id}`);
}));




// ----------------------Delete Route

router.delete("/:id", isLoggedIn, wrapAsync(async(req, res) =>{ 
    let {id} = req.params;
    let deletedEvent = await Event.findByIdAndDelete(id);
    console.log(deletedEvent);
    req.flash("success", "Event Deleted Successfully!");
    res.redirect("/events");
}));

module.exports = router;