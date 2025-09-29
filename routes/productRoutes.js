const express = require("express");
const router = express.Router();
const { getProducts, addProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", addProduct);

router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
