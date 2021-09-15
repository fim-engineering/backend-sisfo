const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.post('/update-status-accept',participantController.update_status_accept);
router.post('/confirmation/update', participantController.confirmation_update);
router.post('/mbti/update',participantController.mbti_update);
router.post('/payment/confirmation', participantController.payment_confirmation);

module.exports = router;