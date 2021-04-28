const User = require('./user');
const Pet = require('./pet');
const Appointment = require('./appointment');

// Setup Associations

User.hasMany(Pet);
Pet.belongsTo(User);

User.hasMany(Appointment);
Appointment.belongsTo(User);

Pet.hasMany(Appointment);
Appointment.belongsTo(Pet);

module.exports = {
  User,
  Pet,
  Appointment
};

// const Address = require('./address');
// User.hasOne(Address);
// Address.belongsTo(User);
// Address,
