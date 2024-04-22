const db = require("../models");

module.exports = {
  getStudentSubjects,
};

async function getStudentSubjects(student) {
  try {
    const group = await db.group.findByPk(student.groupId, {
      include: [{ model: db.subject, through: "groupSubjects" }],
    });

    const subjectsList = group.subjects;

    const formattedSubjects = [];

    for (const subject of subjectsList) {
      const groupSubject = await db.groupSubject.findOne({
        where: {
          groupId: group.id,
          subjectId: subject.id,
        },
        include: [
          { model: db.teacher, include: [{ model: db.user }] },
          {
            model: db.lesson,
            include: [{ model: db.homework }, { model: db.classwork }],
          },
        ],
      });

      const averageAttendance = await getStudentSubjectAverageAttendance(
        student,
        groupSubject
      );

      const averageMark = await getStudentSubjectAverageMark(
        student,
        groupSubject
      );

      formattedSubjects.push({
        id: groupSubject.id,
        name: subject.name,
        teacher: groupSubject.teacher.user.fullname,
        averageAttendance: averageAttendance,
        averageMark: averageMark,
      });
    }

    return formattedSubjects;
  } catch (error) {
    console.error("Failed to fetch group subjects:", error);
    throw new Error("Failed to fetch group subjects");
  }
}

async function getStudentSubjectAverageAttendance(student, groupSubject) {
  try {
    const lessonIds = groupSubject.lessons.map((lesson) => lesson.id);

    const attendances = await db.attendance.findAll({
      where: {
        lessonId: lessonIds,
        studentId: student.id,
      },
    });

    const totalLessons = groupSubject.lessons.length;
    const totalAttendance = attendances.filter(
      (attendance) => attendance.attended
    ).length;

    if (totalLessons === 0) {
      return 0;
    }

    return Math.ceil((totalAttendance / totalLessons) * 100);
  } catch (error) {
    throw error;
  }
}

async function getStudentSubjectAverageMark(student, groupSubject) {
  try {
    const currentMonth = new Date().getMonth() + 1; // Month index starts from 0
    const currentYear = new Date().getFullYear();

    const lessons = groupSubject.lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date);
      return (
        lessonDate.getMonth() + 1 === currentMonth &&
        lessonDate.getFullYear() === currentYear
      );
    });

    let sumMarks = 0;
    let numMarks = 0;

    for (const lesson of lessons) {
      const mark = await db.mark.findOne({
        where: {
          studentId: student.id,
          relatedType: "lesson",
          relatedId: lesson.id,
        },
      });

      if (mark) {
        sumMarks += mark.value;
        numMarks++;
      }
    }

    if (numMarks === 0) {
      return 0;
    }

    const averageMark = (sumMarks / numMarks).toFixed(1);
    return averageMark;
  } catch (error) {
    throw new Error(error);
  }
}
