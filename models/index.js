const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User");
db.Product = require("./Product"); // ✅ Import Product
db.Cart = require("./Cart");
db.CartItem = require("./CartItem");

// Associations
db.User.hasOne(db.Cart, { foreignKey: "UserId" });
db.Cart.belongsTo(db.User, { foreignKey: "UserId" });

db.Cart.hasMany(db.CartItem, { foreignKey: "CartId" });
db.CartItem.belongsTo(db.Cart, { foreignKey: "CartId" });

db.Product.hasMany(db.CartItem, { foreignKey: "ProductId" });
db.CartItem.belongsTo(db.Product, { foreignKey: "ProductId" });

module.exports = db;
