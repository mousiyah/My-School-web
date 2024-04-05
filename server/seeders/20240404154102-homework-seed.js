'use strict';

const { student, lesson, group, homework } = require('../models');
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const lessons = await lesson.findAll();
    const groups = await group.findAll();

    const homeworkData = [];

    // Create homework entries for some lessons
    for (const lesson of lessons) {

      if (Math.random() < 0.5) {
        const randomHomeworkName = faker.lorem.words(2);

        const homeworkEntry = {
          name: randomHomeworkName,
          lessonId: lesson.id,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        homeworkData.push(homeworkEntry);
     }
    }

    // Insert homework records into the database
    const insertedHomeworks = await queryInterface.bulkInsert('homeworks', homeworkData, { returning: true });

    // Create studentHomework entries for each homework
    for (const homeworkEntry of insertedHomeworks) {
      // Fetch the associated lesson explicitly using the lessonId
      const associatedLesson = await lesson.findByPk(homeworkEntry.lessonId);

      const enrolledStudents = await student.findAll({
        where: {
          groupId: associatedLesson.groupId
        }
      });

      const studentHomeworkEntries = enrolledStudents.map(student => ({
        studentId: student.id,
        homeworkId: homeworkEntry.id,
        completed: Math.random() < 0.5,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await queryInterface.bulkInsert('studentHomeworks', studentHomeworkEntries);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studentHomeworks', null, {});
    await queryInterface.bulkDelete('homeworks', null, {});
  }
};
