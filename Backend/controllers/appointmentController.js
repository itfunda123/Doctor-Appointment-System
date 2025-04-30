const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate('patientId doctorId');
  res.json(appointments);
};
