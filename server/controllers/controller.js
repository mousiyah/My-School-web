const { STUDENT_ROLE, TEACHER_ROLE } = require('../constants/roles');
const roleService = require('../services/roleService');

const diaryService = require('../services/diaryService');
const homeworkService = require('../services/homeworkService');
const subjectService = require('../services/subjectService');
const lessonService = require('../services/lessonService');

async function getDiaryDay(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    const { date } = req.query;

    let diaryDay;

    switch (userRole) {
      case STUDENT_ROLE:
        const student = await roleService.getStudentByUserId(userId);
        diaryDay = await diaryService.getStudentDiaryDay(student, date);
        break;
      case TEACHER_ROLE:
        const teacher = await roleService.getTeacherByUserId(userId);
        diaryDay = await diaryService.getTeacherDiaryDay(teacher, date);
        break;
    }

    res.status(200).json(diaryDay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function setHomeworkCompleted(req, res) {
  try {
    const userId = req.userId;
    const { homeworkId, isCompleted } = req.body;
    const student = roleService.getStudentByUserId(userId);
    await homeworkService.setHomeworkCompleted(student, homeworkId, isCompleted);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSubjects(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;

    let subjects;
    switch (userRole) {
      case STUDENT_ROLE:
        const student = await roleService.getStudentByUserId(userId);
        subjects = await subjectService.getStudentSubjects(student);
        break;
      case TEACHER_ROLE:
        const teacher = await roleService.getTeacherByUserId(userId);
        subjects = await subjectService.getTeacherSubjects(teacher);
        break;
    }

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUpcomingHomeworks(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;

    let homeworks;
    switch (userRole) {
      case STUDENT_ROLE:
        const student = await roleService.getStudentByUserId(userId);
        homeworks = await homeworkService.getUpcomingHomeworks(student);
        break;
      case TEACHER_ROLE:
        //
        break;
    }

    res.status(200).json(homeworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getLesson(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    const {lessonId} = req.query;

    let lesson;
    switch (userRole) {
      case STUDENT_ROLE:
        const student = await roleService.getStudentByUserId(userId);
        lesson = await lessonService.getStudentLesson(student, lessonId);
        break;
      case TEACHER_ROLE:
        const teacher = await roleService.getTeacherByUserId(userId);
        lesson = await lessonService.getTeacherLesson(teacher, lessonId);
        break;
    }

    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getDiaryDay,
  setHomeworkCompleted,
  getSubjects,
  getUpcomingHomeworks,
  getLesson,
};