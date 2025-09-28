const db = require("../models");
const Product = db.Product;

exports.addProduct = async (req, res) => {
    try {
        const { name, price, category, image } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const product = await Product.create({ name, price, category, image });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
};
