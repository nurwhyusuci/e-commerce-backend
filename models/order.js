// models/order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

const Order = sequelize.define('Order', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

Order.belongsTo(User);
Order.belongsTo(Product);

module.exports = Order;