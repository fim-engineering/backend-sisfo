const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/home', homeController.getPosts);

module.exports = router;