'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('homeworks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isSubmittable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      lessonId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'lessons', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('homeworks');
  }
};