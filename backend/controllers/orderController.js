const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { formatValidationError } = require("../utils/errorFomatter");

/**
 * @desc get orders
 * @route GET /api/orders
 * @access public
 */

const getOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = req.query.limit ? Number(req.query.limit) : null;
    const skip = limit ? (page - 1) * limit : 0;
    const search = req.query.search;
    const status = req.query.status?.toLowerCase();
    console.log(status);

    let query = {};
    let productIds = [];
    if (search) {
      const products = await Product.find({
        name: { $regex: search, $options: "i" },
      }).select("_id");

      productIds = products.map((p) => p._id);

      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "products.productId": { $in: productIds } },
      ];
    }
    if (status && status !== "all") {
      query.status = status;
    }

    const total = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .skip(skip)
      .limit(limit)
      .populate("products.productId")
      .lean();
    res.status(200).json({
      success: true,
      data: orders,
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc create new order
 * @route POST /api/orders
 * @access public
 */

const addOrder = async (req, res, next) => {
  try {
    const { products, name,email, status,orderId } = req.body;
    let totalPrice = 0;
    const productMap = new Map();
    // loop on each product and check if the quantity of the product not surpass the stock and then calc the totalprice
    for (let prod of products) {
      const currentProduct = await Product.findById(prod.productId);
      if (!currentProduct) {
        return next({
          statusCode: 404,
          message: `Product ${prod.productId} not found`,
        });
      }
      if (prod.quantity > currentProduct.stock) {
        const message =
          currentProduct.stock === 0
            ? `${currentProduct.name} is out of stock`
            : `Only ${currentProduct.stock} ${currentProduct.name}(s) available`;

        return next({ statusCode: 400, message });
      }
      productMap.set(prod.productId, currentProduct);
      totalPrice += currentProduct.price * prod.quantity;
    }

    // update stock after checking is the quantity available
    for (let prod of products) {
      const currentProduct = productMap.get(prod.productId);
      currentProduct.stock -= prod.quantity;
      await currentProduct.save();
    }
    // create order
    const order = await Order.create({ products, totalPrice, name,email, status,orderId });
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = formatValidationError(err);
      return next({ statusCode: 400, errors, message: "Validation failed" });
    }
    next(err);
  }
};

/**
 * @desc update order
 * @route PUT /api/orders/:id
 * @access public
 */

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { products: newProducts } = req.body;
    if (!newProducts?.length) {
      return next({
        statusCode: 400,
        message: "List of products cannpt be empty",
      });
    }
    const order = await Order.findById(id);
    // check if the order exists
    if (!order) {
      return next({ statusCode: 404, message: "Order not found" });
    }
    const oldProducts = order.products;
    const productMap = new Map();

    // restore all old stock
    for (let oldItem of oldProducts) {
      const product = await Product.findById(oldItem.productId);
      product.stock += oldItem.quantity;
      await product.save();
      // load fresh product after get back the old stock because the "product" still have the old stock value
      const freshProduct = await Product.findById(oldItem.productId);
      productMap.set(freshProduct._id.toString(), freshProduct);
    }

    // validate new quantity
    let totalPrice = 0;
    for (let newItem of newProducts) {
      let product = productMap.get(newItem.productId);
      if (!product) {
        product = await Product.findById(newItem.productId);
        if (!product) {
          return next({
            statusCode: 404,
            message: `Product ${newItem.productId} not found`,
          });
        }
        productMap.set(product._id.toString(), product);
      }

      // check stock
      if (newItem.quantity > product.stock) {
        const message =
          product.stock === 0
            ? `${product.name} is out of stock`
            : `Only ${product.stock} ${product.name}(s) available`;

        return next({ statusCode: 400, message });
      }
      totalPrice += newItem.quantity * product.price;
    }

    // substract new quantity
    for (let newItem of newProducts) {
      const product = productMap.get(newItem.productId);
      product.stock -= newItem.quantity;
      await product.save();
    }

    // update the order
    order.products = newProducts;
    order.totalPrice = totalPrice;
    await order.save();
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc delete order
 * @route DELETE /api/orders/:id
 * @access public
 */

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next({ statusCode: 404, message: "Order not found" });
    }

    for (let orderItem of order.products) {
      const product = await Product.findById(orderItem.productId);
      if (!product) {
        return next({ statusCode: 404, message: "Product not found" });
      }
      product.stock += orderItem.quantity;
      await product.save();
    }
    await order.deleteOne();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * @desc get single order
 * @route GET /api/orders/:id
 * @access public
 */

const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const currentOrder = await Order.findById(id).populate("products.productId").lean()
    console.log(currentOrder)
      
    if (!currentOrder) {
      return next({ statusCode: 404, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: currentOrder });
  } catch (err) {
    next(err);
  }
};

module.exports = { addOrder, getOrders, updateOrder, deleteOrder,getOrder };
