const { lesson, mark, homework, classwork } = require('../models');
const faker = require('faker');

const getRandomMark = () => {
  return faker.datatype.number({ min: 2, max: 5 });
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const lessons = await lesson.findAll();
    const marksData = [];

    for (const lesson of lessons) {

        const group = await lesson.getGroup();
        const students = await group.getStudents();
      
      for (const student of students) {
        if (Math.random() < 0.5) {
          marksData.push({
            studentId: student.id,
            lessonId: lesson.id,
            value: getRandomMark(),
            relatedType: null,
            relatedId: null,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }

      if (Math.random() < 0.5) {
        const associatedHomework = await lesson.getHomework();
        const associatedClasswork = await lesson.getClasswork();

        if (associatedHomework || associatedClasswork) {
          let relatedType = null;
          let relatedId = null;

          if (associatedHomework && associatedClasswork) {
            const randomElement = getRandomElement(['homework', 'classwork']);
            relatedType = randomElement;
            relatedId = randomElement === 'homework' ? associatedHomework.id : associatedClasswork.id;
          } else if (associatedHomework) {
            relatedType = 'homework';
            relatedId = associatedHomework.id;
          } else if (associatedClasswork) {
            relatedType = 'classwork';
            relatedId = associatedClasswork.id;
          }

          for (const student of students) {
            if (Math.random() < 0.5) {
              marksData.push({
                studentId: student.id,
                lessonId: lesson.id,
                value: getRandomMark(),
                relatedType: relatedType,
                relatedId: relatedId,
                createdAt: new Date(),
                updatedAt: new Date()
              });
            }
          }
        }
      }
    }

    await queryInterface.bulkInsert('marks', marksData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('marks', null, {});
  }
};
