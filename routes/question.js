const express = require('express');
const router = express.Router();
const Question = require("../models/question.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const {isLoggedIn, validateQuestion, isQuestionWriter, checkGenre} = require("../middleware.js");



// __________________________________________________________________________________________________
// _______________________________Question and Answer Section________________________________________
// __________________________________________________________________________________________________



router.get("/",isLoggedIn, checkGenre,  wrapAsync(async(req, res) => {
    const allQuestion = await Question.find({}).populate("answers").populate("queAuthor");
    res.render("qna/qnaIndex.ejs", {allQuestion});
}));

router.get("/new", (req, res) => {
    res.render("qna/qnanew.ejs");
});

router.post("/new", isLoggedIn, validateQuestion,  wrapAsync(async(req, res) => {

    let newQuestion = await new Question(req.body.question);
    newQuestion.queAuthor = req.user._id;
    await newQuestion.save();
    console.log(newQuestion);
    res.redirect("/qna");
}));


router.get("/:id",isLoggedIn, wrapAsync(async(req, res) => {
    let {id} = req.params;
    const question = await Question.findById(id).populate({path: "answers", populate: {path: "ansAuthor"}}).populate("queAuthor");
    if(!question) {
        req.flash("error", "question you requested for does not exists");
        return res.redirect("/qna");
    }
    res.render("qna/showQuestion.ejs", {question});
}));


router.get("/:id/edit",isLoggedIn, isQuestionWriter, wrapAsync(async(req, res) => {
    let {id} = req.params;
    const question = await Question.findById(id);
    if(!question) {
        req.flash("error", "question you requested for does not exists");
        return res.redirect("/qna");
    }
    res.render("qna/editQuestion.ejs", {question});
}));


router.patch("/:id",isLoggedIn, validateQuestion, isQuestionWriter, wrapAsync(async(req, res) => {
    let {id} = req.params;
    await Question.findByIdAndUpdate(id,{...req.body.question});
    res.redirect("/qna");
}));

router.delete("/:id",isLoggedIn, isQuestionWriter, wrapAsync(async(req, res) => {
    let {id} = req.params;
    await Question.findByIdAndDelete(id);
    res.redirect("/qna");
}));


module.exports = router;