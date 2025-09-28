const db = require("../models");
const Cart = db.Cart;
const Product = db.Product;

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: { UserId: req.params.userId },
            include: Product,
        });
        res.json(cart);
    } catch (err) {
        res.status(500).send("Server error");
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        let cart = await Cart.findOne({ where: { UserId: req.params.userId } });

        if (!cart) {
            cart = await Cart.create({ UserId: req.params.userId });
        }

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ msg: "Product not found" });

        await cart.addProduct(product);
        res.json({ msg: "Product added to cart" });
    } catch (err) {
        res.status(500).send("Server error");
    }
};
