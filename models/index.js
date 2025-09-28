const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Product = require("./Product")(sequelize, Sequelize);
db.Cart = require("./Cart")(sequelize, Sequelize);

// Associations
db.User.hasOne(db.Cart);
db.Cart.belongsTo(db.User);

db.Product.belongsToMany(db.Cart, { through: "CartItems" });
db.Cart.belongsToMany(db.Product, { through: "CartItems" });

module.exports = db;
