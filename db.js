const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = db;

// original code before Heroku Deployment
// const db = new Sequelize('red-badge-project', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres'
// });
// note: passwords with special characters OTHER THAN !, must be encoded, and
// MUST be Added to .env file like this PASS = IktpIh4u#
// Then in this file lines 3-5 would look like this (Note the back ticks!)
// const db = new Sequelize(process.env.DATABASE_URL ||
// `postgresql://postgres://${encodeURIComponent(process.env.PASS)}`, {
//   dialect: 'postgres'
// });
//When running or pushing to LOCAL comment these lines out.
//When running or pushing to HEROKU Make SURE these lines are IN.
// dialectOptions: {
//   ssl: {
//     require: true,
//     rejectUnauthorized: false
//   }
// }
