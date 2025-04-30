const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDoctors = async (req, res) => {
  const doctors = await User.find({ role: 'doctor' });
  res.json(doctors);
};
