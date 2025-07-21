// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb+srv://sweta:SafeP%40ss2025%21%24@cluster0.if7zvxw.mongodb.net/wanderlust?retryWrites=true&w=majority";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// initDB();



const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://sweta:SafeP%40ss2025%21%24@cluster0.if7zvxw.mongodb.net/wanderlust?retryWrites=true&w=majority";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");

    mongoose.connection.close();  // close connection after seeding
  } catch (err) {
    console.error(err);
  }
}

main();
