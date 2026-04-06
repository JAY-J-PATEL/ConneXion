const { required } = require("joi");
const mongoose = require("mongoose");
const Answer = require("./answer");
const User = require("./user");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    queContent: {
        type: String,
        required: true
    },

    queTitle: {
        type: String,
    },

    branch: {
        type: [String],
        default: "All Branches"
    },

    answers: [{
        type: Schema.Types.ObjectId,
        ref: "Answer"
    }],

    queAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

questionSchema.post("findOneAndDelete", async(question) => {
    if(question) {
        await Answer.deleteMany({_id: {$in: question.answers}});
    }
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;