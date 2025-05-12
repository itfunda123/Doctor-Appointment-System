const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointmentsByDoctorId,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', createAppointment);
router.get('/doctor/:doctorId', getAppointmentsByDoctorId);
router.get('/', getAppointments);
router.put('/:id', updateAppointmentStatus); // ✅ Added this line

module.exports = router;
