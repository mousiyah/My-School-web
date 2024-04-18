const db = require("../models");

module.exports = {
  setHomeworkCompleted,
  getUpcomingHomeworks,
  getStudentHomework,
  updateHomework,
  updateClasswork,
};

async function setHomeworkCompleted(student, homeworkId, isCompleted) {
  try {
    const homework = await db.homework.findByPk(homeworkId);

    const studentHomework = await getStudentHomework(student.id, homework.id);
    studentHomework.completed = isCompleted;

    await studentHomework.save();
  } catch (error) {
    throw new Error(error);
  }
}

async function getUpcomingHomeworks(student) {
  try {
    const homeworks = await student.getHomework();

    const today = new Date();
    const twoWeeksFromToday = new Date(
      today.getTime() + 14 * 24 * 60 * 60 * 1000
    ); // Calculate two weeks from today

    const homeworkDetails = await Promise.all(
      homeworks.map(async (homework) => {
        const lesson = await homework.getLesson();
        const groupSubject = await lesson.getGroupSubject();
        const subject = await groupSubject.getSubject();

        const lessonDate = new Date(lesson.date);

        if (lessonDate >= today && lessonDate <= twoWeeksFromToday) {
          return {
            id: homework.id,
            name: homework.name,
            due: lesson.date,
            subject: subject.name,
            completed: (await getStudentHomework(student.id, homework.id))
              .completed,
          };
        } else {
          return null;
        }
      })
    );

    const validHomeworks = homeworkDetails.filter(
      (homework) => homework !== null
    );

    validHomeworks.sort((a, b) => new Date(a.due) - new Date(b.due));

    return validHomeworks;
  } catch (error) {
    throw error;
  }
}

async function getStudentHomework(studentId, homeworkId) {
  try {
    return db.studentHomework.findOne({
      where: { studentId: studentId, homeworkId: homeworkId },
    });
  } catch (error) {
    throw new Error("Failed to fetch homework status");
  }
}

async function updateHomework(lesson, homeworkData) {
  if (!homeworkData) {
    await deleteHomework(lesson);
    return;
  }

  let lessonHomework = await lesson.getHomework();
  if (lessonHomework) {
    await lessonHomework.update({
      name: homeworkData.name,
      description: homeworkData.description,
      isSubmittable: homeworkData.isSubmittable,
    });
  } else {
    lessonHomework = await db.homework.create({
      lessonId: lesson.id,
      name: homeworkData.name,
      description: homeworkData.description,
      isSubmittable: homeworkData.isSubmittable,
    });

    await lesson.setHomework(lessonHomework);

    const lessonGroup = await lesson.getGroup();
    if (lessonGroup) {
      const newLessonHomework = await lesson.getHomework();
      await createStudentHomeworkRecords(newLessonHomework, lessonGroup);
    }
  }
}

async function deleteHomework(lesson) {
  const lessonHomework = await lesson.getHomework();
  await lessonHomework.destroy();
}

async function createStudentHomeworkRecords(lessonHomework, lessonGroup) {
  if (lessonGroup) {
    const groupStudents = await lessonGroup.getStudents();
    await lessonHomework.setStudents(groupStudents, {
      through: { completed: false },
    });
  }
}

async function updateClasswork(lesson, classworkData) {
  if (!classworkData) {
    await deleteClasswork(lesson);
    return;
  }

  let lessonClasswork = await lesson.getClasswork();
  if (lessonClasswork) {
    await lessonClasswork.update({
      name: classworkData.name,
      description: classworkData.description,
    });
  } else {
    lessonClasswork = await db.classwork.create({
      lessonId: lesson.id,
      name: classworkData.name,
      description: classworkData.description,
    });

    await lesson.setClasswork(lessonClasswork);
  }
}

async function deleteClasswork(lesson) {
  const lessonClasswork = await lesson.getClasswork();
  if (lessonClasswork) {
    await lessonClasswork.destroy();
  }
}
