const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check')
const documentController = require('../controllers/documentController');
const isAuth = require('../middleware/is-auth-middleware');

router.get('/', isAuth, documentController.getDocument);
router.post('/', isAuth, documentController.saveDocument);

module.exports = router;