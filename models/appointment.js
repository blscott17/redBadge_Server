const { DataTypes } = require('sequelize');
const db = require('../db');

const Appointment = db.define('appointment', {
  datetime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  note: {
    type: DataTypes.STRING(2000),
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});
module.exports = Appointment;
