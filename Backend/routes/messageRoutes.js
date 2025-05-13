const express = require('express');
const { sendMessage, getMessagesForPatient } = require('../controllers/messageController');
const router = express.Router();

router.post('/', sendMessage);
router.get('/:patientId', getMessagesForPatient);

module.exports = router;
