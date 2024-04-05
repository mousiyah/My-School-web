'use strict';

/** @type {import('sequelize-cli').Migration} */

const uzbekistanCities = [
  'Tashkent',
  'Samarkand',
  'Bukhara',
  'Andijan',
  'Namangan',
  'Nukus',
  'Navoiy',
  'Urgench',
  'Fergana',
  'Jizzakh',
  'Termiz',
  'Angren',
  'Chirchiq',
  'Qo‘qon',
  'Guliston',
  'Bekobod',
  'Margilan',
  'Yangiyer',
  'Xiva',
  'Qarshi',
  'Olmaliq',
];

module.exports = {
  async up(queryInterface, Sequelize) {

    const citiesToInsert = uzbekistanCities.map(city => ({
      name: city
    }));

    await queryInterface.bulkInsert('cities', citiesToInsert, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {});
  }
};

