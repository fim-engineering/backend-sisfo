const express = require('express');
const checkemailController = require('../controllers/checkemailController');
const router = express.Router();


router.post('/check', checkemailController.checkEmail);

module.exports = router;