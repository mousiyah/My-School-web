const db = require('../models');

async function getDiaryDay(userId, date) {
    const groupId = await getStudentGroupId(userId);
    const lessons = await getLessons(groupId, date);

    const diaryEntries = lessons.map(lesson => {
        return getDiaryEntry(lesson);
    });

    return diaryEntries;
}

async function getDiaryEntry(lesson) {
    const { id, date, subject, teacher, room, homework, classwork, marks } = lesson;

        const markDetails = marks.map(mark => {
            return {
                value: mark.value,
                type: mark.relatedType,
            };
        });

        const diaryEntry = {
            lessonId: id,
            date,
            subject: subject.name,
            teacher: teacher.name,
            room: room.name,
            homework: homework ? homework.name : null,
            classwork: classwork ? classwork.name : null,
            marks: markDetails
        }

        return diaryEntry;
}

async function getStudent(userId) {
    try {
      const student = await db.student.findOne({
        where: { userId: userId },
        include: [{ model: db.user }]
      });
      return student;
    } catch (error) {
      throw new Error('Failed to fetch student');
    }
  }

async function getStudentGroupId(userId) {
    try {

      const student = await getStudent(userId);
      if (student) {
        return student.groupId;
      } else {
        throw new Error('Student not found');
      }
    } catch (error) {
      throw new Error('Failed to fetch student group');
    }
}

async function getLessons(groupId, date) {
    try {
      const lessons = await db.lesson.findAll({
        where: {
          groupId: groupId,
          date: date
        },
        include: [
          { model: db.subject },
          { model: db.teacher },
          { model: db.room },
          { model: db.homework },
          { model: db.classwork },
          { model: db.mark, include: [db.homework, db.classwork] }
        ],
        order: [['order', 'ASC']]
      });
      return lessons;
    } catch (error) {
      throw new Error('Failed to fetch lessons');
    }
  }

module.exports = {
  getDiaryDay,
}