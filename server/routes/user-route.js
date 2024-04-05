const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/user/user-exists', userController.userExists);
router.post('/user/login', userController.loginUser);

module.exports = router;
