const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User");
db.Product = require("./Product"); // ✅ Import Product

module.exports = db;
