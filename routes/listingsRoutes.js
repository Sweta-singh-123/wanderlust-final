const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const { isLoggedIn, isOwner, validateListing } = require("../utils/validateListing");

// Index route
router.get("/", listingController.index);

// New listing form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create new listing
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  listingController.createListing
);

// Show single listing
router.get("/:id", listingController.showListing);

// Edit form
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

// Update listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  listingController.updateListing
);

// Delete listing
router.delete("/:id", isLoggedIn, isOwner, listingController.deleteListing);

module.exports = router;

