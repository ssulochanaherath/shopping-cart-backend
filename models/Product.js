const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

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
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Product",
        tableName: "Products",
        timestamps: true,
    }
);

module.exports = Product;
