const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For simplicity, you can create a token without using JWT in this example
    const token = 'your-simple-token';

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
