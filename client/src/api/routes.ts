import api from "./api";

export const diaryApi = {
  getDiaryDay: async (date) => {
    const response = await api.get("diary/day", { params: { date } });
    console.log(response.data);
    return response.data;
  },
};

export const homeworkApi = {
  setHomeworkCompleted: async (homeworkId, isCompleted) => {
    const response = await api.post("homework/set-completed", {
      homeworkId,
      isCompleted,
    });
    return response.data;
  },
  getUpcomingHomeworks: async () => {
    const response = await api.get("homework/upcoming");
    console.log(response.data);
    return response.data;
  },
  submitHomework: async (homeworkId, file) => {
    try {
      const formData = new FormData();
      formData.append("homeworkId", homeworkId);
      formData.append("file", file);

      const response = await api.post("homework/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting homework:", error);
      throw error;
    }
  },
  getStudentHomeworkSubmissionFile: async (studentId, lessonId) => {
    const response = await api.get("homework/submission/file", {
      params: { studentId, lessonId },
    });
    console.log(response.data);
    return response.data;
  },
};

export const subjectApi = {
  getMyGroupSubjects: async () => {
    const response = await api.get("subjects");
    console.log(response.data);
    return response.data;
  },
};

export const lessonApi = {
  getLesson: async (lessonId) => {
    const response = await api.get("lesson", { params: { lessonId } });
    console.log(response.data);
    return response.data;
  },
  saveLesson: async (lessonData) => {
    const response = await api.post("lesson/save", { lessonData });
    return response.data;
  },
  setAttended: async (studentId, lessonId, attended) => {
    const response = await api.post("lesson/set-attended", {
      studentId,
      lessonId,
      attended,
    });
    return response.data;
  },
  getLessonGroupData: async (lessonId) => {
    const response = await api.get("lesson/group", { params: { lessonId } });
    console.log(response.data);
    return response.data;
  },
  setLessonHomeworkMark: async (studentId, lessonId, value) => {
    const response = await api.post("lesson/homework/set-mark", {
      studentId,
      lessonId,
      value,
    });
    return response.data;
  },
  setLessonClassworkMark: async (studentId, lessonId, value) => {
    const response = await api.post("lesson/classwork/set-mark", {
      studentId,
      lessonId,
      value,
    });
    return response.data;
  },
  setLessonMark: async (studentId, lessonId, value) => {
    const response = await api.post("lesson/set-mark", {
      studentId,
      lessonId,
      value,
    });
    return response.data;
  },
};
