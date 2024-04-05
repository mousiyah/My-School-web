'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = [
      { name: 'admin'},
      { name: 'student'},
      { name: 'teacher'}
    ];

    await queryInterface.bulkInsert('roles', roles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
