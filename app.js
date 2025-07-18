// const express = require("express");
// const app = express();
// const path = require("path");
// const mongoose = require("mongoose");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/User");


// // Routes
// const listingRoutes = require("./routes/listingsRoutes");
// const reviewRoutes = require("./routes/reviewsRoutes");
// const userRoutes = require("./routes/usersRoutes");
// const favoritesRoutes = require("./routes/favoritesRoutes");

// // DB Connect
// mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("✅ MongoDB connected");
// });

// // Setups
// app.engine("ejs", ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "public")));

// // Session + Flash
// const sessionConfig = {
//   secret: "thisshouldbeabettersecret",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: true,
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//   },
// };
// app.use(session(sessionConfig));
// app.use(flash());

// // Passport
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // Flash & Current User middleware
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });

// // Routes
// app.use("/listings", listingRoutes);
// app.use("/listings/:id/reviews", reviewRoutes);
// app.use("/", userRoutes);
// app.use("/", favoritesRoutes); 

// // Home route
// app.get("/", (req, res) => {
//   res.render("home");
// });

// // Error handler
// app.use((err, req, res, next) => {
//   res.status(500).render("error", { err });
// });

// // Server
// app.listen(8080, () => {
//   console.log("🚀 Server running on port 8080");
// });

// app.js

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

// Routes
const listingRoutes = require("./routes/listingsRoutes");
const reviewRoutes = require("./routes/reviewsRoutes");
const userRoutes = require("./routes/usersRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ MongoDB connected");
});

// Setups
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
const sessionConfig = {
  secret: "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global middleware for flash & currentUser
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);
app.use("/", favoritesRoutes);

// Home route
app.get("/", (req, res) => {
  res.render("home");
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).render("error", { err });
});

// Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
