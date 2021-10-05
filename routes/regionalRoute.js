const express = require('express');
const router = express.Router();
const regionalController = require('../controllers/regionalController');

router.get('/list',regionalController.lists);
router.post('/create', regionalController.create);
router.post('/read', regionalController.read);
router.post('/update', regionalController.update);
router.post('/delete', regionalController.delete);

module.exports = router;