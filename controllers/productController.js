const db = require("../models");
const Product = db.Product;

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).send("Server error");
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, price, category, image } = req.body;
        const product = await Product.create({ name, price, category, image });
        res.json(product);
    } catch (err) {
        res.status(500).send("Server error");
    }
};
