const authService = require('../services/authService');

module.exports = {
  userWithEmailExists,
  loginUser,
  getUserEmail,
  getUserRole,
};


async function userWithEmailExists(req, res) {
  const { email } = req.query;
  try {
    const exists = await authService.userWithEmailExists(email);
    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const tokens = await authService.loginUser(email, password);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserEmail(req, res) {
  try {
    const userId = req.userId;
    const email = await authService.getUserEmail(userId);
    res.status(200).json({ email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserRole(req, res) {
  try {
    const role = req.userRole;
    res.status(200).json({ role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}