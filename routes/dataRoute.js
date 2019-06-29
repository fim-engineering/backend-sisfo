const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/get-university', dataController.getUniversity);


module.exports = router;