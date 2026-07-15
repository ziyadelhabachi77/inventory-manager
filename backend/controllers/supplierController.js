const supplier = require("../models/supplierModel");
const product = require("../models/productModel");
const { formatValidationError } = require("../utils/errorFomatter");
/**
 * @desc create new supplier
 * @route POST /api/suppliers
 * @access public
 */
const createSupplier = async (req, res, next) => {
  try {
    const newSupplier = await supplier.create(req.body);
    console.log(newSupplier)
    res.status(201).json({ success: true, data: newSupplier });
  } catch (err) {
    if (err.code === 11000) {
      const duplicatedFields = Object.keys(err.keyPattern)[0];
      return next({
        statusCode: 409,
        message: `${duplicatedFields} already exists`,
      });
    }
    if (err.name === "ValidationError") {
      const errors = formatValidationError(err);
      console.log(errors);
      return next({ statusCode: 400, message: "Validation failed", errors });
    }
    next(err);
  }
};

/**
 * @desc get all suppliers
 * @route GET /api/suppliers
 * @access public
 */
const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplier.find().lean();
    res.status(200).json({ success: true, data: suppliers });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc update supplier
 * @route PUT /api/suppliers/:id
 * @access public
 */

const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSupplier = await supplier.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: updatedSupplier });
  } catch (err) {
    if (err.code === 11000) {
      return next({ statusCode: 409, message: "Supplier already exists" });
    }
    if (err.name === "ValidationError") {
      const errors = formatValidationError(err);
      return next({ errors, statusCode: 400, message: "Validation failed" });
    }
    next(err);
  }
};

/**
 * @desc delete supplier
 * @route DELETE /api/suppliers/:id
 * @access public
 */
const deleteSupplier = async (req, res, next) => {
  try {
    // Check if supplier has any products
    const productsCount = await product.countDocuments({ supplierId: req.params.id });

    if (productsCount > 0) {
      return next({
        statusCode: 400,
        message: `Cannot delete supplier. ${productsCount} product(s) are linked to this supplier.`,
      });
    }

    const removeSupplier = await supplier.findByIdAndDelete(req.params.id);
    if (!removeSupplier) {
      return next({ statusCode: 404, message: "Supplier not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
};
