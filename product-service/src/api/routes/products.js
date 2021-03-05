const express = require("express");

const {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} = require("../controllers/products");

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
