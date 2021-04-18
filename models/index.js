const User = require('./user');
const Address = require('./address');
const Pet = require('./pet');
const Appointment = require('./appointment');

// Setup Associations
User.hasOne(Address);
Address.belongsTo(User);

User.hasMany(Pet);
Pet.belongsTo(User);

User.hasMany(Appointment);
Appointment.belongsTo(User);

Pet.hasMany(Appointment);
Appointment.belongsTo(Pet);

module.exports = {
  User,
  Address,
  Pet,
  Appointment
};

module.exports = {
  User,
  Address,
  Pet,
  Appointment
};
