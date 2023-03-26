const Joi = require("joi");

const sortSchema = Joi.object({
   title: Joi.string().required(),
   description: Joi.string().required(),
   alogorithm: Joi.string(),
   tcBest: Joi.string(),
   tcWorst: Joi.string(),
   tcAverage: Joi.string(),
   spaceComplexity: Joi.string(),
   stability: Joi.string().allow(...["yes", "no"]),
});

const sortingAlgorithmSchema = Joi.object({
   sort: Joi.string().required(),
   language: Joi.string().required(),
   code: Joi.string().required(),
});

const optimisedSortingAlgorithmSchema = Joi.object({
   sort: Joi.string().required(),
   language: Joi.string().required(),
   code: Joi.string().required(),
});

const workingSchema = Joi.object({
   sort: Joi.string().required(),
   image: Joi.string(),
   subHeading: Joi.string(),
   text: Joi.string().required(),
   section: Joi.number().required(),
});

module.exports = {
   sortSchema,
   sortingAlgorithmSchema,
   optimisedSortingAlgorithmSchema,
   workingSchema,
};
