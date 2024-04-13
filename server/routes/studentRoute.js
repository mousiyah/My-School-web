const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const studentController = require('../controllers/studentController');

router.get('/student/diary/day', authenticateToken, studentController.getDiaryDay);
router.post('/student/homework/setCompleted', authenticateToken, studentController.setHomeworkCompleted);
router.get('/student/subjects', authenticateToken, studentController.getGroupSubjects);
router.get('/student/homeworks-upcoming', authenticateToken, studentController.getUpcomingHomeworks);

module.exports = router;
