const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const isAuth = require('../middleware/is-auth-middleware');


router.get('/lists',summaryController.lists);
// router.post('/update-final-submit', isAuth, summaryController.updateFinal);
router.post('/update-score', summaryController.updateScore);
router.post('/update-evaluator', summaryController.updateEvaluator);

router.post('/check',summaryController.checkDaftar )


module.exports = router;