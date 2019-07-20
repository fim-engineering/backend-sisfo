const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check')

const homeController = require('../controllers/homeController');
const isAuth = require('../middleware/is-auth-middleware');

router.get('/', homeController.homeRoute)

module.exports = router;