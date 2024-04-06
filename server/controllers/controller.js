const authService = require('../services/authService');
const diaryService = require('../services/diaryService');

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

async function getDiaryDay(req, res) {
  try {
    const userId = req.userId;
    const date = req.date;
    const diaryDay = await diaryService.getDiaryDay(userId, date);
    res.status(200).json(diaryEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  userWithEmailExists,
  loginUser,
  getDiaryDay,
};
