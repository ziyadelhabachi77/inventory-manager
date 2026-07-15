const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category Name required"],
    unique: true,
  },
  description: { type: String, trim: true, default: "", maxLength: 1000 },
},{ timestamps: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
