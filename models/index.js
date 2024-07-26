const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Product = require('./product');
const Order = require('./order');

// Define associations
User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);

const db = {
  Sequelize,
  sequelize,
  User,
  Product,
  Order,
};

module.exports = db;
