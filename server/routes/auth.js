const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


router.post('/user-exists', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    res.status(200).json({ exists: !!user });
  } catch (error) {
    console.error('Error checking if user exists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User with this email does not exist' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Wrong password. Please try again.' });
    }

    // Generate access token
    const accessToken = jwt.sign({ userEmail: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    // Generate refresh token
    const refreshToken = jwt.sign({ userEmail: user.email }, process.env.REFRESH_TOKEN_SECRET);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
