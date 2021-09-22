const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check')
const documentController = require('../controllers/documentController');
const isAuth = require('../middleware/is-auth-middleware');

router.get('/document', isAuth, documentController.getDocument);
router.post('/document', isAuth, documentController.saveDocument);

module.exports = router;