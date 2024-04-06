'use strict';

const bcrypt = require('bcryptjs');
const faker = require('faker');
const { user, student, teacher, role, school, group } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const studentsData = [];
    const teachersData = [];

    const studentRoleId = await getRoleId('student');
    const teacherRoleId = await getRoleId('teacher');

    for (let i = 0; i < 40; i++) {
      const email = `student${i + 1}@example.com`;
      const password = await bcrypt.hash('12345', 10);
      
      studentsData.push({
        email: email,
        password: password,
        roleId: studentRoleId,
        name: `Student${i + 1}`,
        surname: 'Surname',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    for (let i = 0; i < 10; i++) {
      const email = `teacher${i + 1}@example.com`;
      const password = await bcrypt.hash('12345', 10);

      teachersData.push({
        email: email,
        password: password,
        roleId: teacherRoleId,
        name: `Teacher${i + 1}`,
        surname: 'Surname',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await user.bulkCreate([...studentsData, ...teachersData]);

    const insertedUsers = await user.findAll({ attributes: ['id'] });
    const studentIds = insertedUsers.slice(0, 40).map(user => user.id);
    const teacherIds = insertedUsers.slice(40).map(user => user.id);

    const schools = await school.findAll();
    const groups = await group.findAll();

    const randomGroupId = faker.random.arrayElement(groups).id;
    const randomSchoolId = faker.random.arrayElement(schools).id;

    await student.bulkCreate(studentIds.map(userId => ({
      userId: userId,
      groupId: randomGroupId,
      createdAt: new Date(),
      updatedAt: new Date()
    })));

    await teacher.bulkCreate(teacherIds.map(userId => ({
      userId: userId,
      schoolId: randomSchoolId,
      createdAt: new Date(),
      updatedAt: new Date()
    })));


    // assign random headteachers for each group
    await Promise.all(groups.map(async (group) => {
      const teachersInSchool = await teacher.findAll({
        where: { schoolId: group.schoolId }
      });
      const randomTeacher = faker.random.arrayElement(teachersInSchool);
      await group.update({ headteacherId: randomTeacher.id });
    }));

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('students', null, {});
    await queryInterface.bulkDelete('teachers', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};

async function getRoleId(roleName) {
  const roleData = await role.findOne({ where: { name: roleName } });
  return roleData.id;
}
