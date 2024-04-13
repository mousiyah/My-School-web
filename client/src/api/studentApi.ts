import api from './api';

export const studentApi = {
  getDiaryDay: async (date) => {
    const response = await api.get('/student/diary/day', { params: { date } });
    console.log(response.data)
    return response.data;
  },
  setHomeworkCompleted: async (lessonId, isCompleted) => {
    await api.post('/student/homework/setCompleted', { lessonId, isCompleted } );
  },
  getGroupSubjects: async () => {
    const response = await api.get('/student/subjects/');
    console.log(response.data)
    return response.data;
  },
  getUpcomingHomeworks: async () => {
    const response = await api.get('/student/homeworks-upcoming/');
    console.log(response.data)
    return response.data;
  },
};