const express = require("express");
const {
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart
} = require("../controllers/cartController");

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId/add", addToCart);
router.put("/:userId/update/:productId", updateQuantity);
router.delete("/:userId/remove/:productId", removeFromCart);

module.exports = router;
