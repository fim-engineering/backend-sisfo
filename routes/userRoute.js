const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check')

const User = require('../models/user');
const userController = require('../controllers/userController');
const homeController = require('../controllers/homeController');
const isAuth = require('../middleware/is-auth-middleware');

router.post('/login', userController.SocialLogin);
router.post('/checksession', userController.checkSession);
router.post('/savektp', isAuth, userController.saveKtp);
router.post('/save-profile', isAuth, userController.saveProfile);

router.get('/profile', isAuth, userController.getProfile);
router.post('/save-tunnel', isAuth, userController.saveTunnel);


module.exports = router;