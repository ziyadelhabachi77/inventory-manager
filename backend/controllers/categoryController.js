const category = require("../models/categoryModel");
const mongoose = require("mongoose");
const {formatValidationError} = require("../utils/errorFomatter")
/**
 * @desc create new category
 * @route POST /api/category
 * @access public
 */
const addCategory = async (req, res, next) => {
  try {
    const newCategory = await category.create(req.body);
    res.status(201).json({ success: true, data: newCategory });
  } catch (err) {
    if (err.code === 11000) {
      return next({
        message: "Category name already exists",
        statusCode: 409,
      });
    }
    if (err.name === "ValidationError") {
      const errors = formatValidationError(err)
      return next({
        errors,
        statusCode: 400,
        message: "Validation failed",
      });
    }
    next({
      message: err.message || "Failed to create category",
      statusCode: 500,
    });
  }
};

/**
 * @desc get all categories
 * @route GET /api/category
 * @access public
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await category.find().lean();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

/**
 * @desc update category
 * @route PUT /api/category/:id
 * @access public
 */
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({ statusCode: 400, message: "Invalid Id format" });
    }

    const updatedCategory = await category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return next({ statusCode: 404, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (err) {
    if (err.code === 11000) {
      return next({
        message: "Category name already exists",
        statusCode: 409,
      });
    }
    if (err.name === "ValidationError") {
      const errors = formatValidationError(err);
      return next({
        errors,
        statusCode: 400,
        message: "Validation failed",
      });
    }
    next(err);
  }
};

/**
 * @desc delete category
 * @route DELETE /api/category/:id
 * @access public
 */
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({ statusCode: 400, message: "Invalid Id format" });
    }

    const deletedCategory = await category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return next({ statusCode: 404, message: "Category not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { addCategory, getCategories, updateCategory, deleteCategory };
