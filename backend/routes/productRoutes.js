const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  updateProduct,
  deleteProduct,
  getPoduct
} = require("../controllers/productController");

router.route("/").get(getProducts).post(addProducts);
router.route("/:id").put(updateProduct).delete(deleteProduct).get(getPoduct)


module.exports = router;
