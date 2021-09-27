const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check')
const formCompletenessController = require('../controllers/formCompletenessController');
const isAuth = require('../middleware/is-auth-middleware');

router.get('', isAuth, formCompletenessController.getFormCompleteness);
router.post('/submit', isAuth, formCompletenessController.submitFormCompleteness);

module.exports = router;