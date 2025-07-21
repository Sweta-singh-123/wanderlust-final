// models/user.js
// const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// });

// userSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", userSchema);
// models/User.js
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);


