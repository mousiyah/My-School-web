const db = require('../models');

module.exports = {
  getTeacherLesson,
  getLessonsForDayByGroupId,
  getLessonsForDayByTeacherId,
}

async function getTeacherLesson(teacher, lessonId) {
  try {
    const lesson = await db.lesson.findByPk(lessonId);

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    const lessonTeacher = await lesson.getTeacher();

    if (!lessonTeacher || lessonTeacher.id !== teacher.id) {
      throw new Error('Not authorized');
    }

    const lessonSubject = await lesson.getSubject();
    const lessonGroup = await lesson.getGroup();
    const lessonRoom = await lesson.getRoom();
    const lessonHomework = await lesson.getHomework();
    const lessonClasswork = await lesson.getClasswork();

    const response = {
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
  } catch (error) {
    throw new Error('Failed to fetch lesson: ' + error.message);
  }
}


async function getLessonsForDayByGroupId(groupId, date) {
    try {
      const lessons = await db.lesson.findAll({
        where: {
          groupId: groupId,
          date: date
        },
        order: [['order', 'ASC']],
        include: [
          { model: db.subject },
          { model: db.teacher, include: [db.user] },
          { model: db.room },
          { model: db.homework },
          { model: db.classwork },
          { model: db.mark }
        ],
      });
      return lessons;
    } catch (error) {
      throw new Error('Failed to fetch lessons' + error);
    }
}

async function getLessonsForDayByTeacherId(teacherId, date) {
  try {
    const lessons = await db.lesson.findAll({
      where: {
        teacherId: teacherId,
        date: date
      },
      order: [['order', 'ASC']],
      include: [
        { model: db.subject },
        { model: db.group },
        { model: db.room },
        { model: db.homework },
        { model: db.classwork },
      ],
    });
    return lessons;
  } catch (error) {
    throw new Error('Failed to fetch lessons' + error);
  }
}