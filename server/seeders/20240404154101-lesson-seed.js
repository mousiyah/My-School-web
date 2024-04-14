'use strict';

const Sequelize = require('sequelize');
const faker = require('faker');
const { subject, student, room, lesson, teacherSubject} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const attendanceData = [];

    const subjects = await subject.findAll();
    const rooms = await room.findAll();

    const firstStudent = await student.findOne({
      order: [['createdAt', 'ASC']],
    });

    const group = await firstStudent.getGroup();
    const students = await group.getStudents();

    
    for (let month = 1; month <= 12; month++) {
      
      const daysInMonth = new Date(2024, month, 0).getDate();

      
      for (let day = 1; day <= daysInMonth; day++) {
        const lessonsPerDay = faker.datatype.number({ min: 4, max: 5 });

        for (let order = 1; order <= lessonsPerDay; order++) {
          const randomSubject = faker.random.arrayElement(subjects);
          const randomRoom = await faker.random.arrayElement(rooms);
          const teachers = await randomSubject.getTeachers();
          const randomTeacher = faker.random.arrayElement(teachers);
          const date = new Date(`2024-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);

          const newLesson = await lesson.create({
            subjectId: randomSubject.id,
            groupId: group.id,
            roomId: randomRoom.id,
            teacherId: randomTeacher.id,
            date: date,
            order: order,
            createdAt: new Date(),
            updatedAt: new Date()
          });

          for (const student of students) {
            attendanceData.push({
              lessonId: newLesson.id,
              studentId: student.id,
              attended: (Math.random() > 0.3),
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          }

        }
      }
    }

    await queryInterface.bulkInsert('attendances', attendanceData);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};