const { Router } = require('express');
const { Appointment } = require('../models');
const validateSession = require('../middleware/validate-session');
const router = Router();

/* Create an Appointment Record */
router.post('/create/:petid', validateSession, function (req, res) {
  console.log(req.user.id);
  const appointmentEntry = {
    datetime: req.body.datetime,
    note: req.body.note,
    active: req.body.active,
    userId: req.user.id,
    petId: req.params.petid
  };
  Appointment.create(appointmentEntry)
    .then((appointment) => res.status(200).json(appointment))
    .catch((err) => res.status(500).json({ error: err }));
});

/*UPDATE INDIVIDUAL APPOINTMENT BY USER|OWNER */
router.put('/update/:petid', validateSession, function (req, res) {
  const updateAppointmentEntry = {
    datetime: req.body.datetime,
    note: req.body.note,
    active: req.body.active,
    userId: req.user.id,
    petId: req.params.petid
  };
  const query = { where: { petId: req.params.petid, userId: req.user.id } };

  Appointment.update(req.body, query)
    .then((appointment) => res.status(200).json(appointment))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ACTUAL DELETE OF APPOINTMENT ENTRY */
router.delete('/delete/:petid', validateSession, (req, res) => {
  // if (req.user.role !== 'Admin') {
  //   res.json({
  //     message: 'You do not have rights to delete, contact Administration.'
  //   });
  //   return;
  // }
  const query = { where: { petId: req.params.petid, userId: req.user.id } };
  Appointment.destroy(query)
    .then((response) =>
      res.status(200).json({
        message: 'Appointment entry has been deleted'
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
