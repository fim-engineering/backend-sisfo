const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');
const isRecruiterMiddleware = require('../middleware/isRecruiterMiddleware');
const isAuth = require('../middleware/isAuthMiddleware');


router.get('/summaries', isAuth, isRecruiterMiddleware, participantController.getSummaries);
router.get('/', isAuth, isRecruiterMiddleware, participantController.getAll);
router.get('/:userId', isAuth, isRecruiterMiddleware, participantController.getDetailByUserId);

module.exports = router;