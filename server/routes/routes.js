const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/auth/login', controller.loginUser);
router.get('/auth/user-exists', controller.userWithEmailExists);

router.get('/student/diary/day', authenticateToken, controller.getDiaryDay);


module.exports = router;
