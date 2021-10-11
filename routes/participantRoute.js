const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.get('/summaries', participantController.getSummaries);
router.get('/', participantController.getAll);
router.get('/:userId', participantController.getDetailByUserId);

module.exports = router;