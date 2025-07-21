
const Listing = require("../models/listing");
const { cloudinary } = require("../cloudinary");

// Show all listings
module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index", { listings });
   
};

// Render form to create a new listing
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// Create a new listing
module.exports.createListing = async (req, res) => {
  const listing = new Listing(req.body.listing);

  // Support image upload via Cloudinary file or manual URL input
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else if (req.body.listing.image && req.body.listing.image.trim() !== "") {
    listing.image = {
      url: req.body.listing.image.trim(),
      filename: "manual-upload", // Placeholder for manual URL
    };
  } else {
    // Default placeholder image
    listing.image = {
      url: "https://res.cloudinary.com/dummy-cloud/image/upload/v1681234567/placeholder.jpg",
      filename: "placeholder",
    };
  }

  listing.owner = req.user._id;
  await listing.save();
  req.flash("success", "New listing created!");
  res.redirect(`/listings/${listing._id}`);
};

// Show individual listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/edit", { listing });
};

// Update listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else if (req.body.listing.image && req.body.listing.image.trim() !== "") {
    listing.image = {
      url: req.body.listing.image.trim(),
      filename: "manual-upload",
    };
  }

  await listing.save();
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${listing._id}`);
};

// Delete listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
};
