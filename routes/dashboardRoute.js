const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const router = express.Router();

router.get('/index', dashboardController.indexDashboard);
router.get('/reportproduk', dashboardController.terjual);
module.exports = router;