const mongoose = require('mongoose');
const initData = require("./data.js");
const Event = require("../models/event.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/ConneXion";

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

async function main() {
    mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Event.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, host: "69d22b9477936799c1621ecb    "}));
    await Event.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();