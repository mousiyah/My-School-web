'use strict';

const faker = require('faker');
const { school } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const schools = await school.findAll();
    const randomSchoolId = faker.random.arrayElement(schools).id;

    const roomsData = Array.from({ length: 91 }, (_, index) => ({
      schoolId: randomSchoolId,
      name: String(index + 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('rooms', roomsData, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
