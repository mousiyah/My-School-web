const db = require('../models');

module.exports = {
    getStudentByUserId,
  }

async function getStudentByUserId(userId) {
    try {
      const student = await db.student.findOne({
        where: { userId: userId },
        include: [{ model: db.user }, { model: db.homework }]
      });
      return student;
    } catch (error) {
      throw new Error('Failed to fetch student');
    }
}