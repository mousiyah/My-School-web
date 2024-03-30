'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const numUsers = 1;

    const email = "2130288@myschool.co.uk";
    const password = "12345";
    const hashedpassword = await bcrypt.hash(password, 10);

    for (let i = 0; i < numUsers; i++) {
      users.push({
        email: email,
        password: hashedpassword,
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Insert fake user data into the database
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all seeded data
    await queryInterface.bulkDelete('Users', null, {});
  }
};
