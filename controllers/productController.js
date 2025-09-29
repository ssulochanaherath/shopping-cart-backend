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

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, category, image } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.name = name;
        product.price = price;
        product.category = category;
        product.image = image;
        await product.save();

        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

