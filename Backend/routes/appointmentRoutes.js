const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointmentsByDoctorId
} = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAppointments); // Get all appointments
router.get('/:doctorId', getAppointmentsByDoctorId); // Get appointments by doctor ID

module.exports = router;
