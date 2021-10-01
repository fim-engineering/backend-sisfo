const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get('/answer?:tunnelId', answerController.getAnswer);
router.post('/answer', answerController.saveAnswer);

module.exports = router;