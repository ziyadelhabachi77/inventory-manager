const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  supplierName: {type: String, required: [true, "Supplier Name is required"]},
  phone: { type: String, unique: true },
  status: {
    type: String,
    enum: ["active", "pending", "inactive"],
    default: "pending",
  },
  notes: String,
  supplierBadgeColor: String
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
