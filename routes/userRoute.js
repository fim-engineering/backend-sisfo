const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check')

const User = require('../models/user');
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth-middleware');

router.post('/login', userController.SocialLogin);


module.exports = router;