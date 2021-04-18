const { Sequelize } = require('sequelize');

const db = new Sequelize('red-badge-project', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;
