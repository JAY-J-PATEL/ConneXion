// this file is for server side schema validation for client side we alredy put required contion in form section

// we download "joi" package for validation

const Joi = require('joi');
const insight = require('./models/insight');

// now we write schema which we want to validate

module.exports.eventSchema = Joi.object({
    event : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location : Joi.string().required(),
        price: Joi.number().required().min(0),
        image : Joi.string().allow("", null),
        eventtype: Joi.alternatives()
        .try(
          Joi.string(), // Accepts a single string
          Joi.array().items(Joi.string()).min(1) // Accepts an array of strings (at least one item)
        )
        .required()
    }).required()  // Joi.object means  we have to get object and that object name suppose to be event and that object should be required
});

module.exports.insightSchema = Joi.object({
    insight : Joi.object({
        content: Joi.string().required()
    }).required()
});

module.exports.questionSchmea = Joi.object({
    question : Joi.object({
        queTitle: Joi.string().required(),
        queContent: Joi.string().required(),
        branch: Joi.alternatives()
        .try(
          Joi.string(), // Accepts a single string
          Joi.array().items(Joi.string()).min(1) // Accepts an array of strings (at least one item)
        )
        .required()
    }).required()
});

module.exports.answerSchmea = Joi.object({
    answer: Joi.object({
        ansContent: Joi.string().required()
    }).required()
});