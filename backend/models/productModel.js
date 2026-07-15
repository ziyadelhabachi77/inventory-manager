const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be less than 0"],
    },
    description: { type: String, maxLength: 2000, trim: true, default: "" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
