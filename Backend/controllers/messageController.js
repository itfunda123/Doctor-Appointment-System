const Message = require('../models/Message');

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { doctorId, patientId, content } = req.body;

    const message = await Message.create({ doctorId, patientId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get messages for a patient
exports.getMessagesForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const messages = await Message.find({ patientId })
      .sort({ timestamp: -1 })
      .populate('doctorId', 'name');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
