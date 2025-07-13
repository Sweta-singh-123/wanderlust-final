const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => console.log("✅ Connected to DB"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Home
app.get("/", (req, res) => {
  res.send("Hi, I am a robot");
});

// Index - all listings
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// New - form to create listing
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Create - add new listing
app.post("/listings", async (req, res) => {
  const { title, description, price, location, country, image } = req.body.listing;

  const imageData = image?.trim()
    ? { url: image, filename: "user-upload" }
    : {
        url: `https://source.unsplash.com/collection/483251/800x600?sig=${Math.floor(Math.random() * 1000)}`,
        filename: "default-unsplash"
      };

  const newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
    image: imageData
  });

  try {
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    console.error("❌ Error saving listing:", err);
    res.send("Error saving listing.");
  }
});

// Show - single listing
app.get("/listings/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.redirect("/listings");
  res.render("listings/show.ejs", { listing });
});

// Edit - show edit form
app.get("/listings/:id/edit", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.redirect("/listings");
  res.render("listings/edit.ejs", { listing });
});

// Update - save edited listing
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.listing;

  if (typeof updatedData.image === "string") {
    updatedData.image = {
      url: updatedData.image,
      filename: "updated-manually"
    };
  }

  await Listing.findByIdAndUpdate(id, updatedData);
  res.redirect(`/listings/${id}`);
});

// Delete
app.delete("/listings/:id", async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.redirect("/listings");
});

// Server
app.listen(8080, () => {
  console.log("🚀 Server is listening on port 8080");
});



