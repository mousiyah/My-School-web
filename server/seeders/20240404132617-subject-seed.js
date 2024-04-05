'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const subjectsData = [
      { name: 'Mathematics' },
      { name: 'English' },
      { name: 'Science' },
      { name: 'History' },
      { name: 'Geography' },
      { name: 'Physics' },
      { name: 'Art' },
      { name: 'French' },
      { name: 'IT' },
      { name: 'Chemistry' },
      { name: 'Algebra' },
      { name: 'Geometry' },
      { name: 'Music' },
      { name: 'Sports' },
      { name: 'Religion' },
      { name: 'Biology' },
    ];

    await queryInterface.bulkInsert('subjects', subjectsData, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
