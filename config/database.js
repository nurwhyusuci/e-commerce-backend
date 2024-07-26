const { Sequelize } = require('sequelize');
require('dotenv').config();
const path = require('path');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: process.env.DB_SSL_MODE === 'REQUIRED',
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;
