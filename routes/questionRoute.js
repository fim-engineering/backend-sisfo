const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const isRecruiterMiddleware = require('../middleware/isRecruiterMiddleware');
const isAuth = require('../middleware/isAuthMiddleware');


router.get('/', isAuth, questionController.getAll);
router.post('/create', isAuth, isRecruiterMiddleware, questionController.create);
router.post('/read', isAuth, questionController.read);
router.post('/update', isAuth, isRecruiterMiddleware, questionController.update);
router.post('/delete', isAuth, isRecruiterMiddleware, questionController.delete);

module.exports = router;