const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get('/list',answerController.lists);
router.post('/create', answerController.create);
router.post('/read', answerController.read);
router.post('/update', answerController.update);
router.post('/delete', answerController.delete);



module.exports = router;