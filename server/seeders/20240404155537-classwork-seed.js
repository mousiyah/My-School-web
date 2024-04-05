'use strict';

const { lesson, classwork } = require('../models');
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const lessons = await lesson.findAll();

    // Seed classwork
    const classworkData = [];
    for (const lesson of lessons) {

      if (Math.random() < 0.5) {
        continue;
      }

      const randomClassworkName = faker.lorem.words(2);

      const classworkEntry = {
        name: randomClassworkName,
        lessonId: lesson.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      classworkData.push(classworkEntry);
    }
    await queryInterface.bulkInsert('classworks', classworkData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('classworks', null, {});
  }
};
