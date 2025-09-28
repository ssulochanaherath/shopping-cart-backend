const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db"); // adjust path if needed

class Product extends Model {}

Product.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT, // base64 string or URL
            allowNull: true,
        },
    },
    {
        sequelize,           // ✅ Pass the Sequelize instance
        modelName: "Product",
        tableName: "Products",
        timestamps: true,    // adds createdAt + updatedAt
    }
);

module.exports = Product;
