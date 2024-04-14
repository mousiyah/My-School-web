import api from './api';

export const diaryApi = {
  getDiaryDay: async (date) => {
    const response = await api.get('diary/day', { params: { date } });
    console.log(response.data)
    return response.data;
  },
};

export const homeworkApi = {
  setHomeworkCompleted: async (homeworkId, isCompleted) => {
    await api.post('homework/set-completed', { homeworkId, isCompleted } );
  },
  getUpcomingHomeworks: async () => {
    const response = await api.get('homework/upcoming/');
    console.log(response.data)
    return response.data;
  },
};

export const subjectApi = {
  getMyGroupSubjects: async () => {
    const response = await api.get('subjects/');
    console.log(response.data)
    return response.data;
  },
};

export const lessonApi = {
  getLesson: async (lessonId) => {
    const response = await api.get('lesson/', { params: { lessonId } });
    return response.data;
  },
};