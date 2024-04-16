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
    const response = await api.post('homework/set-completed', { homeworkId, isCompleted } );
    return response.data;
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
    console.log(response.data)
    return response.data;
  },
  saveLesson: async (lessonData) => {
    const response = await api.post('lesson/save', { lessonData });
    return response.data;
  },
};