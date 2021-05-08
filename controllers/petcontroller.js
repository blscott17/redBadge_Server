const { Router } = require('express');
const { Pet } = require('../models');
const validateSession = require('../middleware/validate-session');
const router = Router();

router.post('/test', function (req, res) {
  res.send('It worked');
});

/*CREATE A PET RECORD */
router.post('/create', validateSession, function (req, res) {
  // console.log(req.user.id);
  const petEntry = {
    name: req.body.name,
    type: req.body.type,
    breed: req.body.breed,
    sex: req.body.sex,
    age: req.body.age,
    size: req.body.size,
    hairlength: req.body.hairlength,
    vaccinated: req.body.vaccinated,
    active: req.body.active,
    userId: req.user.id
  };
  Pet.create(petEntry)
    .then((pet) => res.status(200).json(pet))
    .catch((err) => res.status(500).json({ error: err }));
});

/* GET ALL OF MY PETS - INCLUDE MY USER|OWNER AND APPOINTMENT INFO */
router.get('/read', validateSession, function (req, res) {
  // const query = {
  //   where: { userId: req.user.id },
  //   include: ['appointment']
  // };

  // Pet.findAll(query)
  Pet.findAll()
    .then((pet) => res.status(200).json(pet))
    .catch((err) =>
      res.status(500).json({
        error: err
      })
    );
});

/* Get Pets for a Specific User|Owner with user info */
//const router = Router();
router.get('/get', validateSession, function (req, res) {
  Pet.findAll({
    // where: { userId: req.user.id, petId: req.pet.id },
    where: { userId: req.user.id }
    // include: ['user', 'appointment']
  }).then(
    function findAllSuccess(data) {
      res.json(data);
      console.log('GET PET', data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

/*UPDATE INDIVIDUAL PET BY USER|OWNER */
router.put('/update/:id', validateSession, function (req, res) {
  const updatePetEntry = {
    name: req.body.name,
    type: req.body.type,
    breed: req.body.breed,
    sex: req.body.sex,
    age: req.body.age,
    size: req.body.size,
    hairlength: req.body.hairlength,
    vaccinated: req.body.vaccinated,
    active: req.body.active,
    userId: req.user.id
  };
  const query = { where: { id: req.params.id, userId: req.user.id } };

  Pet.update(req.body, query)
    .then((pet) => res.status(200).json(pet))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ACTUAL DELETE OF PET ENTRY */
router.delete('/delete/:id', validateSession, (req, res) => {
  if (req.user.role !== 'Admin') {
    res.json({
      message: 'You do not have rights to delete, contact Administration.'
    });
    return;
  }
  const query = { where: { id: req.params.id, userId: req.user.id } };
  Pet.destroy(query)
    .then((response) =>
      res.status(200).json({
        message: 'Pet entry has been deleted'
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
