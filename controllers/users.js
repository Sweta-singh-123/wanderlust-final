// controllers/userController.js

const User = require("../models/User");

// Show user profile (example placeholder)
module.exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/listings");
  }
  res.render("users/profile", { user });
};

// You can add more user-specific logic here later

