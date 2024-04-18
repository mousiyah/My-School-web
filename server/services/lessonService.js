const db = require("../models");
const homeworkService = require("./homeworkService");

module.exports = {
  getTeacherLesson,
  getLessonsForDayByGroupId,
  getLessonsForDayByTeacherId,
  saveLesson,
  getLessonGroup,
};

async function getLessonById(lessonId) {
  const lesson = await db.lesson.findByPk(lessonId);
  if (!lesson) {
    throw new Error("Lesson not found");
  }
  return lesson;
}

async function isLessonTeacher(lesson, teacher) {
  const lessonTeacher = await lesson.getTeacher();
  if (!lessonTeacher || lessonTeacher.id !== teacher.id) {
    throw new Error("Not authorized");
  }
}

async function getLessonData(lesson) {
  const lessonSubject = await lesson.getGroupSubject();
  const lessonGroup = await lesson.getGroup();
  const lessonRoom = await lesson.getRoom();
  const lessonHomework = await lesson.getHomework();
  const lessonClasswork = await lesson.getClasswork();

  const response = {
    id: lesson.id,
    date: lesson.date,
    order: lesson.order,
    subject: {
      id: lessonSubject ? lessonSubject.id : null,
      name: lessonSubject ? lessonSubject.name : null,
    },
    group: {
      id: lessonGroup ? lessonGroup.id : null,
      name: lessonGroup ? lessonGroup.name : null,
    },
    room: lessonRoom ? lessonRoom.name : null,
    homework: lessonHomework
      ? {
          id: lessonHomework.id,
          name: lessonHomework.name,
          description: lessonHomework.description,
          isSubmittable: lessonHomework.isSubmittable,
        }
      : null,
    classwork: lessonClasswork
      ? {
          id: lessonClasswork.id,
          name: lessonClasswork.name,
          description: lessonClasswork.description,
        }
      : null,
  };

  return response;
}

async function getTeacherLesson(teacher, lessonId) {
  try {
    const lesson = await getLessonById(lessonId);
    await isLessonTeacher(lesson, teacher);
    const lessonData = await getLessonData(lesson);
    return lessonData;
  } catch (error) {
    throw new Error("Failed to fetch lesson: " + error.message);
  }
}

async function saveLesson(lessonData) {
  try {
    const lesson = await getLessonById(lessonData.id);

    await homeworkService.updateHomework(lesson, lessonData.homework);
    await homeworkService.updateClasswork(lesson, lessonData.classwork);

    return { success: true, message: "Lesson updated successfully" };
  } catch (error) {
    throw new Error("Failed to save lesson: " + error.message);
  }
}

async function getLessonsForDayByGroupId(groupId, date) {
  try {
    const lessons = await db.lesson.findAll({
      where: {
        groupId: groupId,
        date: date,
      },
      order: [["order", "ASC"]],
      include: [
        { model: db.groupSubject, include: [{ model: db.subject }] },
        { model: db.teacher, include: [db.user] },
        { model: db.room },
        { model: db.homework },
        { model: db.classwork },
      ],
    });
    return lessons;
  } catch (error) {
    throw new Error("Failed to fetch lessons" + error);
  }
}

async function getLessonsForDayByTeacherId(teacherId, date) {
  try {
    const lessons = await db.lesson.findAll({
      where: {
        teacherId: teacherId,
        date: date,
      },
      order: [["order", "ASC"]],
      include: [
        { model: db.groupSubject, include: [{ model: db.subject }] },
        { model: db.group },
        { model: db.room },
        { model: db.homework },
        { model: db.classwork },
      ],
    });
    return lessons;
  } catch (error) {
    throw new Error("Failed to fetch lessons" + error);
  }
}

async function getLessonGroup(teacher, lessonId) {
  try {
    const lesson = await getLessonById(lessonId);
    const group = await lesson.getGroup();
    const students = await group.getStudents();
    const lessonHomework = await lesson.getHomework();
    const lessonClasswork = await lesson.getClasswork();

    const lessonGroupStudents = [];

    for (const student of students) {
      const studentUser = await student.getUser();
      const attendance = await db.attendance.findOne({
        where: { studentId: student.id, lessonId: lesson.id },
      });

      const hwMark = lessonHomework
        ? await db.mark.findOne({
            where: {
              studentId: student.id,
              relatedId: lessonHomework.id,
              relatedType: "homework",
            },
          })
        : null;

      const cwMark = lessonClasswork
        ? await db.mark.findOne({
            where: {
              studentId: student.id,
              relatedId: lessonClasswork.id,
              relatedType: "classwork",
            },
          })
        : null;

      const lessonMark = await db.mark.findOne({
        where: {
          studentId: student.id,
          relatedId: lesson.id,
          relatedType: "lesson",
        },
      });

      lessonGroupStudents.push({
        id: student.id,
        name: studentUser.fullname,
        attended: attendance.attended,
        hwSubmission: {
          id: 0, // EDIT
        },
        hwMark: hwMark ? hwMark.value : null,
        cwMark: cwMark ? cwMark.value : null,
        lessonMark: lessonMark ? lessonMark.value : null,
      });
    }

    const lessonGroupData = {
      group: {
        id: group.id,
        name: group.name,
      },
      hasHomework: lessonHomework ? true : false,
      hasClasswork: lessonClasswork ? true : false,
      students: lessonGroupStudents,
    };

    return lessonGroupData;
  } catch (error) {
    throw new Error("Failed to fetch Group data" + error);
  }
}
