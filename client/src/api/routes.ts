import api from './api';

export const diary = {
  getDiaryDay: async (date) => {
    const response = await api.get('diary/day', { params: { date } });
    console.log(response.data)
    return response.data;
  },
};

export const homework = {
  setHomeworkCompleted: async (homeworkId, isCompleted) => {
    await api.post('homework/set-completed', { homeworkId, isCompleted } );
  },
  getUpcomingHomeworks: async () => {
    const response = await api.get('homework/upcoming/');
    console.log(response.data)
    return response.data;
  },
};

export const subject = {
  getMyGroupSubjects: async () => {
    const response = await api.get('subjects/');
    console.log(response.data)
    return response.data;
  },
};