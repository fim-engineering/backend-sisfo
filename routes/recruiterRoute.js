const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth-middleware');
const recruiterController = require('../controllers/recruiterController');

// add admin
router.post('/:type(recruit|admin)/add',recruiterController.addAdmin);
// list capes submit
router.get('/participant/submited', recruiterController.listSubmitted);
router.get('/lists', recruiterController.listRecruiter);
router.post('/assign', recruiterController.assignRecruiter);

// view detail tiap capes
router.post('/participant/by-recruiter', recruiterController.listByRecruiter);
router.post('/participant/detail',recruiterController.detailParticipant);
router.post('/participant/update/score',recruiterController.updateScore);




module.exports = router;