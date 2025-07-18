// createDemoUser.js

const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });

const createUser = async () => {
  const user = new User({ email: "demo@example.com", username: "demouser" });
  const newUser = await User.register(user, "demopassword");
  console.log("Demo user created:", newUser);
};

createUser().then(() => {
  mongoose.connection.close();
});

