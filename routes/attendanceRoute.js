const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const isAuth = require('../middleware/isAuthMiddleware');


router.get('/', isAuth, attendanceController.getAttendance);
router.post('/', isAuth, attendanceController.saveAttendance);

module.exports = router;