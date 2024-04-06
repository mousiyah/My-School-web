'use strict';

const { lesson, mark, homework, classwork } = require('../models');
const faker = require('faker');

const getRandomMark = () => {
  return faker.datatype.number({ min: 2, max: 5 });
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const lessons = await lesson.findAll();
    const marksData = [];

    for (const lesson of lessons) {
      // Get homework and classwork associated with the lesson
      const associatedHomework = await lesson.getHomework();
      const associatedClasswork = await lesson.getClasswork();

      // Determine relatedType and relatedId based on availability
      let relatedType = null;
      let relatedId = null;

      if (associatedHomework && associatedClasswork) {
        // If both homework and classwork are available, choose randomly
        const randomElement = getRandomElement(['homework', 'classwork']);
        relatedType = randomElement;
        relatedId = randomElement === 'homework' ? associatedHomework.id : associatedClasswork.id;
      } else if (associatedHomework) {
        relatedType = 'homework';
        relatedId = associatedHomework.id;
      } else if (associatedClasswork) {
        relatedType = 'classwork';
        relatedId = associatedClasswork.id;
      }

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
            relatedType: relatedType,
            relatedId: relatedId,
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
