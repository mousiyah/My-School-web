'use strict';

const { lesson } = require('../models');
const faker = require('faker');


const getRandomMark = () => {
  return faker.datatype.number({ min: 2, max: 5 });
};


/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const lessons = await lesson.findAll();
    const marksData = [];

    for (const lesson of lessons) {
      
      // Get group associated with the lesson
      const group = await lesson.getGroup();

      // Get students enrolled in the group
      const students = await group.getStudents();

      for (const student of students) {
        if (Math.random() < 0.6) {
          marksData.push({
            studentId: student.id,
            lessonId: lesson.id,
            value: getRandomMark(),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
    }

    await queryInterface.bulkInsert('marks', marksData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('marks', null, {});
  }
};
