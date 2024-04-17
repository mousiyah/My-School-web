const db = require('../models');
const lessonService = require('./lessonService');
const homeworkService = require('./homeworkService');

module.exports = {
  getStudentDiaryDay,
  getTeacherDiaryDay,
}

async function getStudentDiaryDay(student, date) {
  const groupId = await student.groupId;
  const lessons = await lessonService.getLessonsForDayByGroupId(groupId, date);

  const diaryEntries = await Promise.all(lessons.map(lesson => getStudentDiaryEntry(lesson, student.id)));

  return diaryEntries;
}

async function getStudentDiaryEntry(lesson, studentId) {
  try {

    let studentHomework = null;
    if (lesson.homework != null) {
      studentHomework = await homeworkService.getStudentHomework(studentId, lesson.homework.id);
    }

    const markDetails = lesson.marks
      .filter(mark => mark.studentId === studentId)
      .map(mark => ({
        value: mark.value,
        type: mark.relatedType,
      }));

      const attendance = await db.attendance.findOne({
        where: { studentId: studentId,
                  lessonId: lesson.id }
      });

    const diaryEntry = {
        lessonId: lesson.id,
        order: lesson.order,
        subject: {
          id: lesson.subject.id,
          name: lesson.subject.name,
        },
        teacher: lesson.teacher.user.fullname,
        room: lesson.room.name,
        homework: lesson.homework ? {
          id: lesson.homework.id,
          name: lesson.homework.name,
          completed: studentHomework.completed
        } : null,
        classwork: lesson.classwork ? {
          id: lesson.classwork.id,
          name: lesson.classwork.name,
        } : null,
        marks: markDetails,
        attended: attendance.attended
    };

    return diaryEntry;
  } catch (error) {
      throw new Error(error);
  }
}

// TEACHER

async function getTeacherDiaryDay(teacher, date) {
  const lessons = await lessonService.getLessonsForDayByTeacherId(teacher.id, date);

  const diaryEntries = await Promise.all(lessons.map(lesson => getTeacherDiaryEntry(lesson)));

  return diaryEntries;
}


async function getTeacherDiaryEntry(lesson) {
  try {

    const diaryEntry = {
        lessonId: lesson.id,
        order: lesson.order,
        subject: {
          id: lesson.subject.id,
          name: lesson.subject.name,
        },
        group: {
          id: lesson.group.id,
          name: lesson.group.name,
        },
        room: lesson.room.name,
        homework: lesson.homework ? {
          id: lesson.homework.id,
          name: lesson.homework.name,
          isSubmittable: lesson.homework.isSubmittable,
        } : null,
        classwork: lesson.classwork ? {
          id: lesson.classwork.id,
          name: lesson.classwork.name 
        }: null,
    };

    return diaryEntry;
  } catch (error) {
      throw new Error(error);
  }
}