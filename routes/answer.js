const express = require('express');
const router = express.Router({mergeParams: true});
const Question = require("../models/question.js");
const Answer = require("../models/answer.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const {isLoggedIn, validateAnswer, isAnswerProvider} = require("../middleware.js");


// __________________________________________________________________________________________________
// _______________________________Question and Answer Section **Answers**____________________________
// __________________________________________________________________________________________________



router.post("/ans",isLoggedIn, validateAnswer, wrapAsync(async(req, res) => {
    let {id} = req.params;
    // let {ansContent} = req.body;

    

    const question = await Question.findById(id);
    const newAns = await new Answer(req.body.answer);

    newAns.ansAuthor = req.user._id;
    question.answers.push(newAns);

    await newAns.save();
    await question.save();
    console.log(newAns);
    res.redirect(`/qna/${id}`);
}));

router.get("/:ansId/new",isLoggedIn, isAnswerProvider,  wrapAsync(async(req, res) => {
    let {ansId, id} = req.params;
    const answer = await Answer.findById(ansId);
    res.render("answer/editAnswer.ejs", {answer, id});
}));

router.patch("/:ansId", isLoggedIn, validateAnswer, wrapAsync(async(req, res) => {
    let {id, ansId} = req.params;
    console.log(req.body.ansContent)
    const result = await Answer.findByIdAndUpdate(ansId, {...req.body.answer});
    console.log(result);
    res.redirect(`/qna/${id}`);
}));

router.delete("/:ansId" , isLoggedIn ,isAnswerProvider,  wrapAsync(async(req, res) => {
    let {id, ansId} = req.params;

    await Question.findByIdAndUpdate(id, {$pull: {answers: ansId}});
    await Answer.findByIdAndDelete(ansId);
    // console.log(result);

    req.flash("success", "Answer Deleted Successfully");
    res.redirect(`/qna/${id}`);
}));


module.exports = router;