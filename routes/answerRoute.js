const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get('/lists',answerController.lists);
router.post('/save', answerController.saveAnswer);

// router.post('/read', answerController.read);
// router.post('/delete', answerController.delete);



module.exports = router;