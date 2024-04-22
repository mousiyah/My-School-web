const { STUDENT_ROLE, TEACHER_ROLE } = require("../constants/roles");
const roleService = require("../services/roleService");

const diaryService = require("../services/diaryService");
const homeworkService = require("../services/homeworkService");
const subjectService = require("../services/subjectService");
const lessonService = require("../services/lessonService");

const uploadFile = require("../config/uploadConfig");

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
    const userRole = req.userRole;
    const { homeworkId, isCompleted } = req.body;

    switch (userRole) {
      case TEACHER_ROLE:
        throw new Error("Not Authorized:");
      case STUDENT_ROLE:
        const student = await roleService.getStudentByUserId(userId);
        await homeworkService.setHomeworkCompleted(
          student,
          homeworkId,
          isCompleted
        );
        break;
    }

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
        throw new Error("Not Authorized:");
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
    const { lessonId } = req.query;

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

async function saveLesson(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;

    const { lessonData } = req.body;

    switch (userRole) {
      case STUDENT_ROLE:
        throw new Error("Not Authorized:");
      case TEACHER_ROLE:
        await lessonService.saveLesson(lessonData);
        break;
    }

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getLessonGroup(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    const { lessonId } = req.query;

    let lessonGroup;
    switch (userRole) {
      case STUDENT_ROLE:
        throw new Error("Not Authorized:");
      case TEACHER_ROLE:
        const teacher = await roleService.getTeacherByUserId(userId);
        lessonGroup = await lessonService.getLessonGroup(teacher, lessonId);
        break;
    }

    res.status(200).json(lessonGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function setAttended(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    const { studentId, lessonId, attended } = req.body;

    switch (userRole) {
      case STUDENT_ROLE:
        throw new Error("Not Authorized:");
      case TEACHER_ROLE:
        const teacher = await roleService.getTeacherByUserId(userId);
        await lessonService.setAttended(teacher, studentId, lessonId, attended);
        break;
    }

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function setLessonMark(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    const { studentId, lessonId, value } = req.body;

    switch (userRole) {
      case STUDENT_ROLE:
        throw new Error("Not Authorized:");
      case TEACHER_ROLE:
        const teacher = await roleService.getTeacherByUserId(userId);
        await lessonService.setLessonMark(teacher, studentId, lessonId, value);
        break;
    }

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function setLessonHomeworkMark(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    const { studentId, lessonId, value } = req.body;

    switch (userRole) {
      case STUDENT_ROLE:
        throw new Error("Not Authorized:");
      case TEACHER_ROLE:
        const teacher = await roleService.getTeacherByUserId(userId);
        await lessonService.setLessonHomeworkMark(
          teacher,
          studentId,
          lessonId,
          value
        );
        break;
    }

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function setLessonClassworkMark(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    const { studentId, lessonId, value } = req.body;

    switch (userRole) {
      case STUDENT_ROLE:
        throw new Error("Not Authorized:");
      case TEACHER_ROLE:
        const teacher = await roleService.getTeacherByUserId(userId);
        await lessonService.setLessonClassworkMark(
          teacher,
          studentId,
          lessonId,
          value
        );
        break;
    }

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function submitHomework(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;

    switch (userRole) {
      case STUDENT_ROLE:
        uploadFile(req, res, async function (err) {
          if (err) {
            throw new Error(err);
          } else {
            const student = await roleService.getStudentByUserId(userId);
            const file = req.file;
            const formData = req.body;
            const { homeworkId } = formData;

            await homeworkService.submitHomework(student, homeworkId, file);
            res.status(200).json();
          }
        });
        break;
      case TEACHER_ROLE:
        throw new Error("Not Authorized:");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getStudentHomeworkSubmissionFile(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    const { studentId, lessonId } = req.query;

    let filepath;
    switch (userRole) {
      case STUDENT_ROLE:
        const student = await roleService.getStudentByUserId(userId);
        filepath = await homeworkService.getStudentHomeworkSubmissionFile(
          student,
          studentId,
          lessonId
        );
        break;
      case TEACHER_ROLE:
        const teacher = await roleService.getTeacherByUserId(userId);
        filepath = await homeworkService.getStudentHomeworkSubmissionFile(
          teacher,
          studentId,
          lessonId
        );
        break;
    }

    res.status(200).json(filepath);
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
  saveLesson,
  getLessonGroup,
  submitHomework,
  getStudentHomeworkSubmissionFile,
  setAttended,
  setLessonMark,
  setLessonHomeworkMark,
  setLessonClassworkMark,
};
