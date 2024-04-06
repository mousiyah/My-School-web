import axios from 'axios';
import { useAuth } from 'hooks/useAuth';

//const getAccessToken = useAuth();

export const userService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post('user/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  userExists: async (email: string) => {
    try {
      const response = await axios.get('user/user-exists', { params: { email } });
      return response.data.exists;
    } catch (error) {
      return false;
    }
  },
};
