const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth-middleware');
const recruiterController = require('../controllers/recruiterController');

// add admin
router.post('/:type(recruit|admin)/add',recruiterController.addAdmin);
// list capes submit
router.get('/participant/submited', recruiterController.listSubmitted)
router.post('/participant/submited/:id', recruiterController.listSubmitted)


module.exports = router;