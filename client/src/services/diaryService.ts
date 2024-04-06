import api from './api';

export const diaryService = {
  getDiaryDay: async (date) => {
    const response = await api.post('/student/diary/day', { date });
    return response.data;
  },
};