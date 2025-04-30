const express = require('express');
const { register, getDoctors } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.get('/doctors', getDoctors);

module.exports = router;
