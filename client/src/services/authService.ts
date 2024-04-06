import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('auth/login', { email, password });
    return response.data;
  },
  userExists: async (email) => {
    const response = await api.get('auth/user-exists', { params: { email } });
    return response.data.exists;
  },
};