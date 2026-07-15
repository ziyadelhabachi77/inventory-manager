const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (err) {
    console.error("Database error connection", err);
    process.exit(1);
  }
}

module.exports = connectDb;
