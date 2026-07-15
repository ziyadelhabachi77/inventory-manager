const product = require("../models/productModel");
const supplier = require("../models/supplierModel");
const category = require("../models/categoryModel");
const mongoose = require("mongoose");
const { formatValidationError } = require("../utils/errorFomatter");
/**
 * @desc get all products
 * @route GET /api/products
 * @access public
 */
const getProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = req.query.limit ? Number(req.query.limit) : null;
    const skip = limit ? (page - 1) * limit : 0;
    const search = req.query.search;
    const categoryValue = req.query.category;
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (categoryValue) {
      const currentCategory = await category.findOne({ name: categoryValue });
      if (currentCategory) {
        query.categoryId = currentCategory._id;
      }
    }

    // get the total product
    const total = await product.countDocuments(query);

    const products = await product
      .find(query)
      .skip(skip)
      .limit(limit)
      .populate("categoryId", "name")
      .lean();

    res.status(200).json({
      success: true,
      data: products,
      page,
      totalPage: Math.ceil(total / limit),
      limit,
      total,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc create new product
 * @route POST /api/products
 * @access public
 */

const addProducts = async (req, res, next) => {
  try {
    const { supplierId, categoryId } = req.body;

    // check if the cateogry && supplier id is not empty
    if (!supplierId || !categoryId) {
      return next({
        statusCode: 400,
        message: "Supplier and Category are required",
      });
    }

    // check if the supplier && cateogry id is valide objectId
    if (
      !mongoose.Types.ObjectId.isValid(supplierId) ||
      !mongoose.Types.ObjectId.isValid(categoryId)
    ) {
      return next({ statusCode: 400, message: "Invalid Id format" });
    }

    // check if the supplier is exists
    const supplierExists = await supplier.findById(supplierId);
    // check if the category is exists
    const categoryExists = await category.findById(categoryId);

    console.log(req.body);

    if (!supplierExists && !categoryExists) {
      return next({
        statusCode: 404,
        message: "Category and Supplier not found or empty",
      });
    }
    if (!supplierExists) {
      return next({
        statusCode: 404,
        message: "Supplier not found or empty",
      });
    }
    if (!categoryExists) {
      return next({
        statusCode: 404,
        message: "Category not found or empty",
      });
    }

    // create the product
    const newProduct = await product.create({
      ...req.body,
      categoryId: req.body.categoryId,
      supplierId: req.body.supplierId,
    });
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = formatValidationError(err);
      return next({ statusCode: 400, errors, message: "Validation Error" });
    }
    return next(err);
  }
};

/**
 * @desc update product
 * @route PUT /api/products/:id
 * @access public
 */

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // check if the id is a valid object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({ statusCode: 400, message: "Invalid Id format" });
    }
    const updatedProduct = await product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // check if the updatedProduct is not empty or null, that mean it's updated successfully
    if (!updatedProduct) {
      return next({ statusCode: 404, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = formatValidationError(err);
      return next({ statusCode: 400, errors, message: "Validation failed" });
    }
    next(err);
  }
};

/**
 * @desc delete product
 * @route DELETE /api/products/:id
 * @access public
 */

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return next({ statusCode: 404, message: "Product not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * @desc get single product
 * @route GET /api/products/:id
 * @access public
 */

const getPoduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const currentProduct = await product
      .findById(id)
      .populate("categoryId")
      .populate("supplierId");
    if (!currentProduct) {
      return next({ statusCode: 404, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: currentProduct });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  addProducts,
  updateProduct,
  deleteProduct,
  getPoduct,
};
