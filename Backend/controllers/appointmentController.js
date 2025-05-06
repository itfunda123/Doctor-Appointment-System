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
  try {
    // Fetch appointments and populate patient and doctor details
    const appointments = await Appointment.find()
      .populate('patientId', 'name')  // Populate only the 'name' field from User (patient)
      .populate('doctorId', 'name'); // Populate only the 'name' field from User (doctor)

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};
