import api from './api';

export const authApi = {
  login: async (email, password) => {
    const response = await api.post('auth/login', { email, password });
    return response.data;
  },
  userExists: async (email) => {
    const response = await api.get('auth/user-exists', { params: { email } });
    return response.data.exists;
  },
  getUserEmail: async () => {
    const response = await api.get('auth/email');
    return response.data.email;
  },
  getUserRole: async () => {
    const response = await api.get('auth/role');
    return response.data.role;
  }
};