const express = require('express');
const { createAppointment, getAppointments } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAppointments);  // Fetch all appointments (or add filters here)

module.exports = router;
