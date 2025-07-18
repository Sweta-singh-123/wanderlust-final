// utils/validationSchemas.js
const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({
      "any.required": "Title is required",
      "string.empty": "Title cannot be empty",
    }),
    description: Joi.string().allow(""), // optional
    image: Joi.string().uri().allow(""), // optional
    price: Joi.number().min(0).required().messages({
      "any.required": "Price is required",
      "number.min": "Price must be positive",
    }),
    location: Joi.string().required().messages({
      "any.required": "Location is required",
      "string.empty": "Location cannot be empty",
    }),
    country: Joi.string().allow(""), // optional
  }).required(),
});

module.exports = { listingSchema };
