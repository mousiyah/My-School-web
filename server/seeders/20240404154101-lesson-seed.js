'use strict';

const Sequelize = require('sequelize');
const faker = require('faker');
const { subject, student, room, teacherSubject} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const lessonData = [];

    const subjects = await subject.findAll();
    const rooms = await room.findAll();

    const firstStudent = await student.findOne({
      order: [['createdAt', 'ASC']],
    });

    for (let day = 1; day <= 30; day++) {
      const lessonsPerDay = faker.datatype.number({ min: 4, max: 5 });

      for (let order = 1; order <= lessonsPerDay; order++) {

        const randomSubject = faker.random.arrayElement(subjects);
        const randomRoom = await faker.random.arrayElement(rooms);

        const teachers = await randomSubject.getTeachers();
        const randomTeacher = faker.random.arrayElement(teachers);

        const date = new Date(`2024-04-${day}`);
        
        lessonData.push({
          subjectId: randomSubject.id,
          groupId: firstStudent.groupId,
          roomId: randomRoom.id,
          teacherId: randomTeacher.id,
          date: date,
          order: order,
          createdAt: new Date(),
          updatedAt: new Date()
        });

      }
    }

    await queryInterface.bulkInsert('lessons', lessonData);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};
