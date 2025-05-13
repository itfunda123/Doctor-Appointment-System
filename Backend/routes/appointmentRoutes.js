const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointmentsByDoctorId,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

const router = express.Router();

// Create a new appointment
router.post('/', createAppointment);

// Get all appointments
router.get('/', getAppointments);

// Get appointments by specific doctor ID
router.get('/doctor/:doctorId', getAppointmentsByDoctorId);

// ✅ Corrected path: Update appointment status (approve/reject)
router.put('/:id/status', updateAppointmentStatus);

module.exports = router;
