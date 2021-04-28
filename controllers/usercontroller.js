const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../models');
const validateSession = require('../middleware/validate-session');
const router = Router();

/* REGISTER A USER */
router.post('/create', function (req, res) {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    active: req.body.active,
    role: req.body.role
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        { id: user.id, email: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24
        }
      );
      res.json({
        user: user,
        message: 'You have successfully registered with Happy Tales!',
        sessionToken: token
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

/* USER LOGIN */
router.post('/login', function (req, res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              res.status(200).json({
                user: user,
                message: 'Welcome to Happy Tales Mobile Pet Grooming!',
                sessionToken: token
              });
            } else {
              res.status(502).send({ error: 'Login Failed' });
            }
          }
        );
      } else {
        res.status(500).json({ error: 'User does not exist' });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

/* Get Owner Info with their Pets and Appointments */

router.get('/read', validateSession, function (req, res) {
  User.findAll({
    where: { id: req.user.id }
    // include: ['address']
    // include: { all: true }
  }).then(
    function findOneSuccess(data) {
      res.json(data);
    },
    function findOneError(err) {
      res.status(500).send(err.message);
    }
  );
});

/* UPDATE USER */
router.put('/update', validateSession, function (req, res) {
  const updateUserEntry = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    active: req.body.active,
    role: req.body.role
  };
  const query = { where: { id: req.user.id } };

  User.update(updateUserEntry, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ACTUAL DELETE OF USER|OWNER */
router.delete('/delete/:id', validateSession, (req, res) => {
  // console.log(req.user.role);
  if (req.user.role !== 'Admin') {
    res.json({
      message: 'You do not have rights to delete, contact Administration.'
    });
    return;
  }
  const query = { where: { id: req.params.id } };
  User.destroy(query)
    .then((response) =>
      res.status(200).json({
        message: 'User entry has been deleted'
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;

// { id: user.id, username: user.username },  previously line 57 took out username
