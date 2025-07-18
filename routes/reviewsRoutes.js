const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview } = require("../utils/validateReview");
const { createReview, deleteReview } = require("../controllers/reviewsController");

// ✅ POST /listings/:id/reviews
router.post("/", validateReview, wrapAsync(createReview));

// ✅ DELETE /listings/:id/reviews/:reviewId
router.delete("/:reviewId", wrapAsync(deleteReview));

module.exports = router;
