const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        let cart = await Cart.findOne({ where: { UserId: userId } });
        if (!cart) cart = await Cart.create({ UserId: userId });

        const items = await CartItem.findAll({
            where: { CartId: cart.id },
            include: [{ model: Product }]
        });

        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;

        let cart = await Cart.findOne({ where: { UserId: userId } });
        if (!cart) cart = await Cart.create({ UserId: userId });

        const existing = await CartItem.findOne({
            where: { CartId: cart.id, ProductId: productId }
        });

        if (existing) {
            existing.quantity += 1;
            await existing.save();
            return res.json({ message: "Quantity updated" });
        }

        await CartItem.create({ CartId: cart.id, ProductId: productId, quantity: 1 });
        res.json({ message: "Product added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ where: { UserId: userId } });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = await CartItem.findOne({ where: { CartId: cart.id, ProductId: productId } });
        if (!item) return res.status(404).json({ message: "Item not found" });

        item.quantity = quantity;
        await item.save();

        res.json({ message: "Quantity updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const cart = await Cart.findOne({ where: { UserId: userId } });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        await CartItem.destroy({ where: { CartId: cart.id, ProductId: productId } });
        res.json({ message: "Removed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
