const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class CartItem extends Model {}

CartItem.init(
    {
        CartId: { type: DataTypes.INTEGER, primaryKey: true },
        ProductId: { type: DataTypes.INTEGER, primaryKey: true },
        quantity: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false }
    },
    {
        sequelize,
        modelName: "CartItem",
        tableName: "cartitems",
        timestamps: true
    }
);

module.exports = CartItem;
