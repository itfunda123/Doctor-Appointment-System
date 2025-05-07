const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment); // Use 201 status code for created resource
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    // Fetch appointments and populate patient and doctor details
    const appointments = await Appointment.find()
      .populate('patientId', '_id name')
      .populate('doctorId', 'name'); // Populate only the 'name' field from User (doctor)

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
      .populate('doctorId', 'name'); // Populate doctor details only by name

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this doctor' });
    }

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctor appointments', error: err.message });
  }
};
