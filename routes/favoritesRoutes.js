const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");

// Toggle favorite
router.post("/listings/:id/favorite", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const listingId = req.params.id;

    const index = user.favorites.findIndex(favId => favId.equals(listingId));
    if (index === -1) {
      user.favorites.push(listingId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();
    // You might want to send JSON for AJAX instead of redirecting, if you want smooth UX
    res.redirect(`/listings/${listingId}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong with favorites.");
    res.redirect(`/listings/${req.params.id}`);
  }
});

// Show favorite listings
router.get("/favorites", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.render("listings/favorites", { favorites: user.favorites });
  } catch (err) {
    console.error(err);
    req.flash("error", "Cannot load favorites.");
    res.redirect("/listings");
  }
});

module.exports = router;

