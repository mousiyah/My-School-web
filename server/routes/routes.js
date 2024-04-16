const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const controller = require('../controllers/controller');

router.get('/diary/day', authenticateToken, controller.getDiaryDay);

router.get('/subjects', authenticateToken, controller.getSubjects);

router.post('/homework/set-completed', authenticateToken, controller.setHomeworkCompleted);
router.get('/homework/upcoming', authenticateToken, controller.getUpcomingHomeworks);

router.get('/lesson', authenticateToken, controller.getLesson);
router.post('/lesson/save', authenticateToken, controller.saveLesson);

module.exports = router;
