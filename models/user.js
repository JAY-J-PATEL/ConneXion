const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchmea = new Schema({
    email: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    batch: {
        type:Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    is_online: {
        type: String,
        default: '0'
    }
},
{timestamps: true}
);

userSchmea.plugin(passportLocalMongoose);  //automatically username and password will be added  [npm package passport-local-mongoose]

module.exports = mongoose.model('User', userSchmea);