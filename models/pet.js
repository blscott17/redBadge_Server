const { DataTypes } = require('sequelize');
const db = require('../db');

const Pet = db.define('pet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hairlength: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vaccinated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
module.exports = Pet;
