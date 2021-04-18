const { DataTypes } = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // }
});
module.exports = Address;
