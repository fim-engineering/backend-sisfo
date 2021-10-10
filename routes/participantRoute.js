const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.get('/count', participantController.count);
router.get('/', participantController.getAll);
router.get('/:userId', participantController.getDetailByUserId);

module.exports = router;