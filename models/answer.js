const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");


const answerSchema = new Schema({

    ansContent: {
        type: String,
        required: true
    },

    ansAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;