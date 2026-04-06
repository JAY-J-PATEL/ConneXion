const mongoose = require("mongoose");
const { events } = require("./insight");
const Schema = mongoose.Schema;
const Insight = require("./insight.js");

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/1363600437/photo/scroll-of-certificate-and-certificate-holder.jpg?s=612x612&w=is&k=20&c=taGuMTvH5PIpU2WC8CtK19my0SPXEs1J3zK5sf5Ystg=",
        set: (v) => v === ""? "https://media.istockphoto.com/id/1363600437/photo/scroll-of-certificate-and-certificate-holder.jpg?s=612x612&w=is&k=20&c=taGuMTvH5PIpU2WC8CtK19my0SPXEs1J3zK5sf5Ystg=":v,
    },
    price: Number,
    location: String,
    eventtype: {
        type: [String],
        default: "any"
    },
    insights: [
        {
            type: Schema.Types.ObjectId,
            ref: "Insight"
        }
    ],
    host: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

eventSchema.post("findOneAndDelete", async(event) => {
    if(event) {
        await Insight.deleteMany({_id: {$in: event.insights}});
    }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;