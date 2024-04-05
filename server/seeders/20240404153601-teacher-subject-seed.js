'use strict';

const faker = require('faker');
const { teacher, subject } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const subjects = await subject.findAll();
    const teachers = await teacher.findAll();

    const teacherSubjectData = [];

    subjects.forEach(subject => {
      
      const randomTeacher = faker.random.arrayElement(teachers);

      teacherSubjectData.push({
        teacherId: randomTeacher.id,
        subjectId: subject.id,
        createdAt: new Date(),
        updatedAt: new Date()
    });

  });

    await queryInterface.bulkInsert('teacherSubjects', teacherSubjectData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teacherSubjects', null, {});
  }
};
