const express = require('express');
const {
    createSchedule,
    getInstructorSchedules,
    updateSchedule,
    deleteSchedule
} = require('../controllers/scheduleController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/schedule', authMiddleware, roleMiddleware('admin'), createSchedule);
router.get('/schedule/:instructorId', authMiddleware, roleMiddleware('admin'), getInstructorSchedules);
router.put('/schedule/:scheduleId', authMiddleware, roleMiddleware('admin'), updateSchedule);
router.delete('/schedule/:scheduleId', authMiddleware, roleMiddleware('admin'), deleteSchedule);

module.exports = router;
