const { required, ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
	jobRole: {
		type: String,
		required: true,
	},

    jobLocation: {
		type: String,
		required: true,
	},

	jobType: {
		type: String,
		required: true,
	},

	salaryRange: {
		type: String,
		required: true,
	},

    department: {
        type: String, 
        required: true
    },

    applicationDeadline: {
        type: String, 
    },

    experience: {
        type: String, 
        required: true
    },

    education: {
        type: String, 
        required: true
    },

    jobDescription: {
        type: String, 
        required: true
    },

    websiteLink: {
        type: String, 
        required: true
    },

    companyName: {
        type: String, 
        required: true
    },

    companyDescription: {
        type: String, 
    },

    jobPostedUser : {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Job = mongoose.model("job", jobSchema);
module.exports = Job;
