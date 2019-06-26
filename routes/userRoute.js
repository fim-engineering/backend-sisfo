const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check')

const User = require('../models/user');
const userController = require('../controllers/userController');
const homeController = require('../controllers/homeController');
const isAuth = require('../middleware/is-auth-middleware');

router.post('/login', userController.SocialLogin);
router.post('/checksession', userController.checkSession);
router.post('/savektp', userController.saveKtp);


module.exports = router;