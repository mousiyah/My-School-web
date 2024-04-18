const db = require("../models");

module.exports = {
  getStudentSubjects,
  getGroupSubjects,
};

async function getStudentSubjects(student) {
  const groupId = await student.groupId;
  return await getGroupSubjects(groupId);
}

async function getGroupSubjects(groupId) {
  try {
    const group = await db.group.findByPk(groupId);

    const subjectsList = await group.getSubjects();

    const formattedSubjects = await Promise.all(
      subjectsList.map(async (subject) => {
        const groupSubject = await db.groupSubject.findOne({
          where: {
            groupId: group.id,
            subjectId: subject.id,
          },
        });

        const teacher = await groupSubject.getTeacher();
        const teacherUser = await teacher.getUser();

        return {
          id: subject.id,
          name: subject.name,
          teacher: teacherUser.fullname,
        };
      })
    );

    return formattedSubjects;
  } catch (error) {
    throw new Error("Failed to fetch group subjects");
  }
}
