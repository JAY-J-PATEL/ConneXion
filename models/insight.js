const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insightSchema = new Schema({
    content: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    insightProvider: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model("Insight", insightSchema);