const { lesson } = require("../models");
const faker = require("faker");

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

      const homework = await lesson.getHomework();
      const classwork = await lesson.getClasswork();

      for (const student of students) {
        if (Math.random() < 0.5) {
          marksData.push({
            studentId: student.id,
            value: getRandomMark(),
            relatedType: "lesson",
            relatedId: lesson.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        if (homework && Math.random() < 0.5) {
          marksData.push({
            studentId: student.id,
            value: getRandomMark(),
            relatedType: "homework",
            relatedId: homework.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else if (classwork) {
          marksData.push({
            studentId: student.id,
            value: getRandomMark(),
            relatedType: "classwork",
            relatedId: classwork.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }

    await queryInterface.bulkInsert("marks", marksData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("marks", null, {});
  },
};
