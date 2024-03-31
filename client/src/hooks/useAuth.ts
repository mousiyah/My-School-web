import axios from 'axios';

import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import createRefresh from 'react-auth-kit/createRefresh';
import { useNavigate } from './useNavigate';

export const useAuth = () => {
  
  const signIn = useSignIn();
  const signOut = useSignOut();
  const {navigateToDashboard, navigateToLogin} = useNavigate();

  const logout = () => {
    signOut();
    navigateToLogin();
  };


  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post('login', { email, password });
      const { accessToken, refreshToken } = response.data;

      if (signIn({
        auth: {
          token: accessToken,
          type: 'Bearer'
        },
        userState: {
          email: email,
        }
      })) {
        navigateToDashboard();
      }

    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  const userExists = async (email: string): Promise<boolean> => {
    try {
      const response = await axios.post('user-exists', { email });
      return response.data.exists;
    } catch (error) {
      return false;
    }
  };


  return { login, logout, userExists};
};
