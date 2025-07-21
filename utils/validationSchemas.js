// utils/validationSchemas.js
const Joi = require("joi");

// Listing validation schema
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

// Review validation schema
const reviewSchema = Joi.object({
  review: Joi.object({
    author: Joi.string().required().messages({
      "any.required": "Author is required",
      "string.empty": "Author cannot be empty",
    }),
    rating: Joi.number().required().min(1).max(5).messages({
      "any.required": "Rating is required",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating cannot be more than 5",
    }),
    comment: Joi.string().required().messages({
      "any.required": "Review comment is required",
      "string.empty": "Review comment cannot be empty",
    }),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
