const Sequelize = require("sequelize");
const sequelize = require("../config/db"); // your Sequelize instance

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./User");

module.exports = db;
