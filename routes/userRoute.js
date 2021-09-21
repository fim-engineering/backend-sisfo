const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check')

const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth-middleware');

router.post('/login', userController.SocialLogin);
router.post('/checksession', userController.checkSession);

router.get('/profile', isAuth, userController.getProfile);
router.post('/profile/identity', isAuth, userController.saveIdentity);
router.post('/profile/skill', isAuth, userController.saveSkill);
router.post('/profile/social-media', isAuth, userController.saveSocialMedia);

router.post('/savektp', isAuth, userController.saveKtp);

router.post('/save-tunnel', isAuth, userController.saveTunnel);


module.exports = router;