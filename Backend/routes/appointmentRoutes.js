const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointmentsByDoctorId
} = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', createAppointment);
router.get('/doctor/:doctorId', getAppointmentsByDoctorId); // Specific route for doctors
router.get('/', getAppointments); // Get all appointments

module.exports = router;
