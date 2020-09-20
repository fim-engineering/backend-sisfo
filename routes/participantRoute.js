const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.post('/update-status-accept',participantController.update_status_accept);



module.exports = router;