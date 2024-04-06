const userService = require('../services/user-service');

module.exports = {
  userWithEmailExists,
  loginUser,
};


async function userWithEmailExists(req, res) {
  const { email } = req.query;
  try {
    const exists = await userService.userWithEmailExists(email);
    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const tokens = await userService.loginUser(email, password);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}