const mongoose = require("mongoose");

// connection string
const connString = "mongodb://localhost:27017";

// connecting to the database
const connectDB = async () => {
  try {
    await mongoose.connect(connString, {
      useNewUrlParser: true,
    });

    console.log("MongoDB connection SUCCESS ⭐️");
  } catch (error) {
    console.log("MongoDB connection FAILED 😥️");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
