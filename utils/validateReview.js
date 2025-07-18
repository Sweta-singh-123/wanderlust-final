const { reviewSchema } = require("./validationSchemas");
const ExpressError = require("./ExpressError");

// Middleware to validate review data using JOI
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

