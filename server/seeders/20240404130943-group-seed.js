'use strict';

const faker = require('faker');
const { school } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const schools = await school.findAll();

    const groupsToInsert = [];

    const groupLetters = ["A", "B", "C", "D"];

    for (let year = 1; year <= 9; year++) {
      for (const letter of groupLetters) {
        const randomSchoolId = faker.random.arrayElement(schools).id;

        groupsToInsert.push({
          letter: letter,
          year: year,
          schoolId: randomSchoolId,
          headteacherId: null,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('groups', groupsToInsert, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('groups', null, {});
  }
};
