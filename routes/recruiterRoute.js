const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuthMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');
const recruiterController = require('../controllers/recruiterController');

// add admin
router.post('/:type(recruit|admin)/add',recruiterController.addAdmin);

// list capes submit
router.get('/participant/submited', recruiterController.listSubmitted);
router.get('/lists', recruiterController.listRecruiter);

// view detail tiap capes
router.post('/participant/by-recruiter', recruiterController.listByRecruiter);
router.post('/participant/detail',recruiterController.detailParticipant);
router.post('/participant/update/score',recruiterController.updateScore);

router.post('/recruiter/add', recruiterController.addRecruiter);
router.post('/participant/available-to-assign', recruiterController.availableAssing);
router.post('/participant/to-assign', recruiterController.toAssign);
router.post('/participant/undo-assign', recruiterController.undoAssign);

router.post('/assign', isAuth, isAdmin, recruiterController.assignRecruiter);

module.exports = router;