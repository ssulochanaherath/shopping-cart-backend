const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Cart extends Model {}

Cart.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        UserId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
        sequelize,
        modelName: "Cart",
        tableName: "carts",
        timestamps: true
    }
);

module.exports = Cart;
