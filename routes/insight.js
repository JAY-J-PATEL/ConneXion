const express = require('express');
const router = express.Router({mergeParams: true});
const Event = require("../models/event.js");

const wrapAsync = require("../utils/wrapAsync.js");
const Insight = require("../models/insight.js");
const ExpressError = require("../utils/ExpressError.js");
const {eventSchema, insightSchema} = require("../schema.js");

const {isLoggedIn, saveRedirectUrl, isOwner, validateEvent, validateInsight, isInsightProvider} = require("../middleware.js");




// Post Route for Insights

router.post("/",isLoggedIn, validateInsight, wrapAsync( async(req, res) => {
    let event = await Event.findById(req.params.id);
    let newInsight = new Insight(req.body.insight);
    newInsight.insightProvider = req.user._id;
    if(req.user.genre === "Student") {
        req.flash("error", "Student are not allowed to post Insights");
        return res.redirect(`/events/${event._id}`);
    }

    event.insights.push(newInsight);

    await newInsight.save();
    await event.save();
    req.flash("success", "New Insight Posted successfully!");
    res.redirect(`/events/${event._id}`);
}));


// Delete Route for Insights

router.delete("/:insightId",isLoggedIn, isInsightProvider, wrapAsync( async(req, res) => {
    let {id, insightId} = req.params;
    

    await Event.findByIdAndUpdate(id, {$pull: {insights: insightId}});
    await Insight.findByIdAndDelete(insightId);

    req.flash("success", "Insight Deleted Successfully!");
    res.redirect(`/events/${id}`);
}));


module.exports = router;