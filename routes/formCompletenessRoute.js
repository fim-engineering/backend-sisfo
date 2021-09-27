const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check')
const formCompletenessController = require('../controllers/formCompletenessController');
const isAuth = require('../middleware/is-auth-middleware');

router.get('/form-completeness', isAuth, formCompletenessController.getFormCompleteness);
router.post('/form-completeness/submit', isAuth, formCompletenessController.submitFormCompleteness);

module.exports = router;