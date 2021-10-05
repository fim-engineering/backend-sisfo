const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth-middleware');


router.post('/login', userController.socialLogin);
router.post('/checksession', userController.checkSession);

router.get('/profile', isAuth, userController.getProfile);
router.post('/profile/identity', isAuth, userController.saveIdentity);
router.post('/profile/skill', isAuth, userController.saveSkill);
router.post('/profile/social-media', isAuth, userController.saveSocialMedia);
router.post('/profile/alumni-reference', isAuth, userController.saveAlumniReference);
router.post('/profile/fim-activity', isAuth, userController.saveFimActivity);
router.post('/profile/organization-experience', isAuth, userController.saveOrganizationExperience);

module.exports = router;