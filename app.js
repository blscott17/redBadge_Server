require('dotenv').config();
const Express = require('express');
const db = require('./db');

const app = Express();

// Import middlewares as a bundle
const middlewares = require('./middleware');

// Import controllers as a bundle
const controllers = require('./controllers');

// Parse the body of all requests as JSON
app.use(Express.json());

app.use('/user', controllers.User);
app.use('/address', controllers.Address);
app.use('/pet', controllers.Pet);
app.use('./appointment', controllers.Appointment);

// .then(() => db.sync({ force: true }))
db.authenticate()
  // .then(() => db.sync({ force: true }))
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on port ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log('[server]: Server Crashed');
    console.log(e);
  });
