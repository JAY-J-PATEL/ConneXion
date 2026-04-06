const express = require('express');
const router = express.Router();
const Job = require("../models/job");
const {isLoggedIn, saveRedirectUrl, isOwner, validateEvent, validateInsight, isInsightProvider, checkGenre} = require("../middleware.js");

router.get("/", checkGenre, async(req, res) => {
    const allJobs = await Job.find().populate("jobPostedUser");
    res.render("jobs/jobIndex.ejs" ,{allJobs});
});

router.get("/new", (req, res) => {
    res.render("jobs/newJob.ejs");
});

router.post("/", async(req, res) => {
    const newJob = await Job.insertOne(req.body.job);
    newJob.jobPostedUser = req.user._id;
    // console.log(result);
    // console.log(req.body.job);
    await newJob.save();
    req.flash("success", "Job Posted Successfully!!!");
    res.redirect("/jobs");
});

router.get("/:id/edit", async(req, res) => {
    let {id} = req.params;
    const job = await Job.findById(id);
    // console.log(job);
    res.render("jobs/editJob.ejs", {job});
});

router.put("/:id", async(req, res) => {
    let {id} = req.params;
    let result = await Job.findByIdAndUpdate(id, {...req.body.job});
    result.save();
    req.flash("success", "Job updated successfully");
    res.redirect("/jobs");
});

router.delete("/:id", async(req, res) => {
    let {id} = req.params;
    await Job.findByIdAndDelete(id);
    req.flash("success", "Job deleted successfully");
    res.redirect("/jobs");
});

module.exports = router;