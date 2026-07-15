const express = require("express");
const router = express.Router();
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.route("/").post(addCategory).get(getCategories);
router.route("/:id").put(updateCategory).delete(deleteCategory);
 
module.exports = router;
