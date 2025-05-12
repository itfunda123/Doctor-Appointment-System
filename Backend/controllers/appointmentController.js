const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', '_id name')
      .populate('doctorId', 'name');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId })
      .populate('patientId', '_id name')
      .populate('doctorId', 'name');

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this doctor' });
    }

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctor appointments', error: err.message });
  }
};
