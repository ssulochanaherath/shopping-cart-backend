const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models"); // CommonJS style

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Shopping Cart Backend is running!");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

// Start server after syncing database
const startServer = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("✅ Database connected successfully.");

        await db.sequelize.sync({ alter: true });
        console.log("✅ Database synced successfully.");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Unable to connect to the database:", err.message);
    }
};

startServer();
