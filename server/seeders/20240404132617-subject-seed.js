'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const subjectsData = [
      { name: 'Math' },
      { name: 'English' },
      { name: 'Science' },
      { name: 'History' },
      { name: 'Geography' },
      { name: 'Physics' },
      { name: 'Art' },
      { name: 'French' },
      { name: 'IT' },
      { name: 'Chemistry' },
      { name: 'Music' },
      { name: 'Sports' },
      { name: 'Religion' },
      { name: 'Biology' },
      { name: 'Literature' },
      { name: 'Economics' },
      { name: 'Psychology' },
      { name: 'Sociology' },
      { name: 'Philosophy' },
      { name: 'History' },
      { name: 'Statistics' },
      { name: 'Engineering' },
      { name: 'Medicine' },
      { name: 'Law' },
      { name: 'Business' },
      { name: 'Architecture' },
    ];

    await queryInterface.bulkInsert('subjects', subjectsData, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
