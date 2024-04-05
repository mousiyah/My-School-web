'use strict';
const { school, city } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const _city = await city.findOne({ 
      where: { 
        name: 'Tashkent' 
      }
    });

    await school.create({
      name: 'School 50',
      email: 'school50@school.com',
      address: 'Old Street',
      phone: '+44 74563254',
      postcode: 'SA1 3FY',
      website: 'school50.com',
      cityId: _city.id
    });
  },

  async down(queryInterface, Sequelize) {
    await school.destroy({
      where: {
        name: 'School 50'
      }
    });
  }
};
