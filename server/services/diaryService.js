const db = require('../models');
const studentService = require('./studentService');
const lessonService = require('./lessonService');
const homeworkService = require('./homeworkService');
const attendance = require('../models/attendance');

module.exports = {
  getDiaryDay,
}

async function getDiaryDay(userId, date) {
  const student = await studentService.getStudentByUserId(userId);
  const groupId = await student.groupId;
  const lessons = await lessonService.getLessonsForDayByGroupId(groupId, date);

  const diaryEntries = await Promise.all(lessons.map(lesson => getDiaryEntry(lesson, student.id)));

  return diaryEntries;
}

async function getDiaryEntry(lesson, studentId) {
  try {

      const markDetails = lesson.marks
          .filter(mark => mark.studentId === studentId)
          .map(mark => ({
              value: mark.value,
              type: mark.relatedType,
          }));
      
      let studentHomework = null;
      if (lesson.homework != null) {
        studentHomework = await homeworkService.getStudentHomework(studentId, lesson.homework.id);
      }

      const attendance = await db.attendance.findOne({
        where: { studentId: studentId,
                  lessonId: lesson.id }
      });

      const diaryEntry = {
          lessonId: lesson.id,
          subject: lesson.subject.name,
          teacher: lesson.teacher.user.fullname,
          room: lesson.room.name,
          homework: lesson.homework ? lesson.homework.name : null,
          isHomeworkCompleted: lesson.homework ? studentHomework.completed : null,
          classwork: lesson.classwork ? lesson.classwork.name : null,
          marks: markDetails,
          attended: attendance.attended
      };

      return diaryEntry;
  } catch (error) {
      throw new Error(error);
  }
}