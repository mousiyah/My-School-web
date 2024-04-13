const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/auth/login', authController.loginUser);
router.get('/auth/user-exists', authController.userWithEmailExists);
router.get('/auth/email', authenticateToken, authController.getUserEmail);

module.exports = router;
