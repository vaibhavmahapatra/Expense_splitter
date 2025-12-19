const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://honeymahapatra:mahapatra@cluster0.nrao793.mongodb.net/database");
  console.log(" MongoDB connected");
};

module.exports = connectDB;
