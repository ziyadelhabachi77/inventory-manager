const express = require("express");

const router = express.Router();
const {
  addOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  getOrder
} = require("../controllers/orderController");

router.route("/").post(addOrder).get(getOrders);
router.route("/:id").put(updateOrder).delete(deleteOrder).get(getOrder);

module.exports = router;
