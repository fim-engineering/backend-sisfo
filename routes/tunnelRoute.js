const express = require('express');
const router = express.Router();
const tunnelController = require('../controllers/tunnelController');

router.get('/list',tunnelController.lists);
router.get('/alltunnel',tunnelController.listsAll);
router.post('/create', tunnelController.create);
router.post('/read', tunnelController.read);
router.post('/update', tunnelController.update);
router.post('/delete', tunnelController.delete);



module.exports = router;