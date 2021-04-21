const { Router } = require('express');
const { Address } = require('../models');
const validateSession = require('../middleware/validate-session');
const router = Router();

/* Create an Address Record */
router.post('/create', validateSession, function (req, res) {
  console.log(req.user.id);
  const addressEntry = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    active: req.body.active
    // userId: req.user.id 4/20
  };
  Address.create(addressEntry)
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(500).json({ error: err }));
});

/*UPDATE INDIVIDUAL ADDRESS BY USER|OWNER */
router.put('/update/', validateSession, function (req, res) {
  const updateAddressEntry = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    active: req.body.active,
    userId: req.user.id
  };
  const query = { where: { id: req.user.id } };

  Address.update(updateAddressEntry, query)
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ACTUAL DELETE OF ADDRESS ENTRY */
router.delete('/delete/:id', validateSession, (req, res) => {
  if (req.user.role !== 'Admin') {
    res.json({
      message: 'You do not have rights to delete, contact Administration.'
    });
    return;
  }
  const query = { where: { id: req.params.id } };
  Address.destroy(query)
    .then((response) =>
      res.status(200).json({
        message: 'Address entry has been deleted'
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
