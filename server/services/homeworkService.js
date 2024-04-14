const db = require('../models');

module.exports = {
    setHomeworkCompleted,
    getUpcomingHomeworks,
    getStudentHomework,
}

async function setHomeworkCompleted(student, homeworkId, isCompleted) {
    try {
      const homework = await db.homework.findByPk(homeworkId);

      const studentHomework = await getStudentHomework(student.id, homework.id);
      studentHomework.completed = isCompleted;
      console.log(isCompleted);
      await studentHomework.save();

    } catch (error) {
      throw new Error(error);
    }
}

async function getUpcomingHomeworks(student) {
  try {
    const homeworks = await student.getHomework();

    const today = new Date();
    const twoWeeksFromToday = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000); // Calculate two weeks from today

    const homeworkDetails = await Promise.all(homeworks.map(async homework => {
      const lesson = await homework.getLesson();
      const subject = await lesson.getSubject();

      const lessonDate = new Date(lesson.date);

      if (lessonDate >= today && lessonDate <= twoWeeksFromToday) {
        return {
          id: homework.id,
          name: homework.name,
          due: lesson.date,
          subject: subject.name,
          completed: (await getStudentHomework(student.id, homework.id)).completed
        };
      } else {
        return null;
      }
    }));

    const validHomeworks = homeworkDetails.filter(homework => homework !== null);

    validHomeworks.sort((a, b) => new Date(a.due) - new Date(b.due));

    return validHomeworks;

  } catch (error) {
    throw error;
  }
}

async function getStudentHomework(studentId, homeworkId) {
  try {
    return db.studentHomework.findOne({
      where: { studentId: studentId,
               homeworkId: homeworkId }
    });
  } catch (error) {
    throw new Error('Failed to fetch homework status');
  }
}

async function getHomeworkByLessonId(lessonId) {
  try {
    const homework = await db.homework.findOne({
      where: { lessonId: lessonId },
    });
    return homework;
  } catch (error) {
    throw new Error('Failed to fetch homework');
  }
}

