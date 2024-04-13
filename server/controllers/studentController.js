const diaryService = require('../services/diaryService');
const homeworkService = require('../services/homeworkService');
const subjectService = require('../services/subjectService');


module.exports = {
  getDiaryDay,
  setHomeworkCompleted,
  getGroupSubjects,
  getUpcomingHomeworks,
};

async function getDiaryDay(req, res) {
  try {
    const userId = req.userId;
    const { date } = req.query;
    const diaryDay = await diaryService.getDiaryDay(userId, date);
    res.status(200).json(diaryDay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function setHomeworkCompleted(req, res) {
  try {
    const userId = req.userId;
    const { lessonId, isCompleted } = req.body;
    await homeworkService.setHomeworkCompleted(userId, lessonId, isCompleted);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getGroupSubjects(req, res) {
  try {
    const userId = req.userId;
    const subjects = await subjectService.getStudentSubjects(userId);
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUpcomingHomeworks(req, res) {
  try {
    const userId = req.userId;
    const homeworks = await homeworkService.getUpcomingHomeworks(userId);
    res.status(200).json(homeworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
