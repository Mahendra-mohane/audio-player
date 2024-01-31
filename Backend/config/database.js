const mongoose = require("mongoose");

const dbURI = process.env.DB_URI;

const connection = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connection;
