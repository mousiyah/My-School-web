const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/auth/login', authController.loginUser);
router.get('/auth/user-exists', authController.userWithEmailExists);
router.get('/auth/email', authenticateToken, authController.getUserEmail);
router.get('/auth/role', authenticateToken, authController.getUserRole);

module.exports = router;
