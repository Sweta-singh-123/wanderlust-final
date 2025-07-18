// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");
// const passport = require("passport");

// // Register routes
// router
//   .route("/register")
//   .get(userController.renderRegisterForm)
//   .post(userController.registerUser);

// // Login routes
// router
//   .route("/login")
//   .get(userController.renderLoginForm)
//   .post(
//     passport.authenticate("local", {
//       failureRedirect: "/login",
//       failureFlash: true,
//     }),
//     userController.loginUser
//   );

// // Logout
// router.get("/logout", userController.logoutUser);

// module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

// Register
router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
});

// Login
router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings"); // 👈 Redirecting to listings after login
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
});

module.exports = router;



