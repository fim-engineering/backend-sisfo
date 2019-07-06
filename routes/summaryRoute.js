const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');

router.get('/lists',summaryController.lists);
router.post('/update-final-submit', summaryController.updateFinal);
router.post('/update-score', summaryController.updateScore);
router.post('/update-evaluator', summaryController.updateEvaluator);


module.exports = router;