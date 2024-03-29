const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/',questionController.getAll);
router.post('/create', questionController.create);
router.post('/read', questionController.read);
router.post('/update', questionController.update);
router.post('/delete', questionController.delete);

module.exports = router;