const db = require('../models');

module.exports = {
    getLessonsForDayByGroupId,
    getLessonsForDayByTeacherId,
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