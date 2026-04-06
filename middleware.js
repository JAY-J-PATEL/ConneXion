const Event = require("./models/event.js");
const Insight = require("./models/insight.js");
const ExpressError = require("./utils/ExpressError.js");
const {eventSchema, insightSchema, questionSchmea, answerSchmea} = require("./schema.js");
const Question = require("./models/question.js");
const Answer = require("./models/answer.js");


// validateEvent event is middleware where we can check the validation of schema from server side using joi
module.exports.validateEvent = (req, res, next) => {
    let {error} = eventSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");  
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

module.exports.validateInsight = (req, res, next) => {
    let {error} = insightSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");  
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateQuestion = (req, res, next) => {
    let {error} = questionSchmea.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateAnswer = (req, res, next) => {
    let {error} = answerSchmea.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to post or see an Event");
        return res.redirect("/login");
    } else {
        next();
    }
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    let event = await Event.findById(id);
    if(!event) {
        req.flash("error", "Event you requested for does not exist");
        return res.redirect("/events");
    }
    if(!event.host._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the host of this event");
        return res.redirect(`/events/${id}`);
    }
    next();
}

module.exports.isInsightProvider = async(req, res, next) => {
    let {id, insightId} = req.params;
    let insight = await Insight.findById(insightId);
    if(!insight.insightProvider._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You did not write this Insight");
        return res.redirect(`/events/${id}`);
    }
    next();
}

module.exports.isQuestionWriter = async(req, res, next) => {
    let {id} = req.params;
    let question = await Question.findById(id);
    if(!question) {
        req.flash("error", "Question you requested for does not exist!");
        return res.redirect("/qna");
    }
    if(!question.queAuthor._id.equals(res.locals.currUser._id)) {
        req.flash("error", "you are not author of this question");
        return res.redirect("/qna");
    }
    next();
}

module.exports.isAnswerProvider = async(req, res, next) => {
    let {id, ansId} = req.params;
    let answer = await Answer.findById(ansId);
    if(!answer) {
        req.flash("error", "Answer you requested for does not exist");
        return res.redirect("/qna");
    }
    if(!answer.ansAuthor._id.equals(res.locals.currUser._id)) {
        req.flash("error", "This Answer has been not posted by you!");
        return res.redirect(`/qna/${id}`);
    }
    next();
}

module.exports.checkGenre = async(req, res, next) => {
    let result = req.user.genre;
    if(result == "Block") {
        req.flash("error", "you have been blocked by admin");
        return res.redirect("/ConneXion");
    } 
    next();
}