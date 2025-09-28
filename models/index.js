const db = {};
const Sequelize = require("sequelize");
const sequelize = require("../config/db");

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User");

module.exports = db;
