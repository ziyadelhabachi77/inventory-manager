const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: String,
    orderId: String,
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: {
          type: Number,
          min: [1, "Quantity cannot be less than 1"],
          required: true,
        },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["completed", "pending", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
