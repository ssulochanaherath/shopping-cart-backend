const express = require("express");
const router = express.Router();
const { getProducts, addProduct } = require("../controllers/productController");

// No JWT here (open demo). Add auth middleware if needed.
router.get("/", getProducts);
router.post("/", addProduct);

module.exports = router;
