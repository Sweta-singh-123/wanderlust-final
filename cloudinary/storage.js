// cloudinary/storage.js

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./index");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Wanderlust",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  storage,
};