const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview } = require("../utils/validateReview");
const { createReview, deleteReview } = require("../controllers/reviewsController");
const Listing = require("../models/listing");

// GET /listings/:id/reviews/new - render form to create a review
router.get("/new", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("reviews/new", { listing });
}));

// POST /listings/:id/reviews - submit new review
router.post("/", validateReview, wrapAsync(createReview));

// DELETE /listings/:id/reviews/:reviewId - delete a review
router.delete("/:reviewId", wrapAsync(deleteReview));

module.exports = router;

