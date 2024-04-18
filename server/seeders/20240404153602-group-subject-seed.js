"use strict";

const faker = require("faker");
const { group, subject, teacher } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const subjects = await subject.findAll();
    const groups = await group.findAll();
    const teachers = await teacher.findAll();

    const groupSubjectData = [];
    for (const groupItem of groups) {
      for (const subjectItem of subjects) {
        const randomTeacher =
          teachers[Math.floor(Math.random() * teachers.length)];

        groupSubjectData.push({
          groupId: groupItem.id,
          subjectId: subjectItem.id,
          teacherId: randomTeacher.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("groupSubjects", groupSubjectData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("groupSubjects", null, {});
  },
};
