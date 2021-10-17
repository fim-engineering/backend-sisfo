const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const isAuth = require('../middleware/isAuthMiddleware');


router.get('/answer?:tunnelId', isAuth, answerController.getAnswer);
router.post('/answer', isAuth, answerController.saveAnswer);

module.exports = router;