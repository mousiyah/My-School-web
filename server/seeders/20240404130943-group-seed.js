'use strict';

const faker = require('faker');
const { school } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const schools = await school.findAll();

    const groupsToInsert = [];

    for (let i = 0; i < 10; i++) {
      const randomSchoolId = faker.random.arrayElement(schools).id;
      const groupName = faker.random.alpha().toUpperCase();
      const year = faker.datatype.number({ min: 1, max: 11 }); // Updated usage

      groupsToInsert.push({
        name: groupName,
        year: year,
        schoolId: randomSchoolId,
        headteacherId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('groups', groupsToInsert, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('groups', null, {});
  }
};
