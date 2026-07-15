const express = require("express");
const router = express.Router();
const supplier = require("../models/supplierModel");
const {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

router.route("/").post(createSupplier).get(getSuppliers);
router.route("/:id").put(updateSupplier).delete(deleteSupplier);
//

module.exports = router;

// In routes file (temporary)
// router.get("/debug-indexes", async (req, res) => {
//   const indexes = await supplier.collection.indexes();
//   res.json(indexes);
// });
