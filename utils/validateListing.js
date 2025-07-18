const { listingSchema } = require("./validationSchemas");
const ExpressError = require("./ExpressError");
const Listing = require("../models/listing");

// Middleware: Validate listing with JOI
function validateListing(req, res, next) {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
}

// Middleware: Check if user is logged in
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }
  next();
}

// Middleware: Check if user is owner of listing
async function isOwner(req, res, next) {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that.");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports = {
  validateListing,
  isLoggedIn,
  isOwner,
};

