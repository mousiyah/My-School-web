import { useState } from 'react';

import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import createRefresh from 'react-auth-kit/createRefresh';

import { useNavigate } from 'hooks/useNavigate';
import { authService } from 'services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();
  const signOut = useSignOut();
  const { navigateToDashboard, navigateToLogin } = useNavigate();

  const logout = async (): Promise<void> => {
    setLoading(true);
    await signOut();
    navigateToLogin();
    setLoading(false);
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const {accessToken, refreshToken } = await authService.login(email, password);
      if (signIn({
        auth: {
          token: accessToken,
          type: 'Bearer'
        },
        userState: {
          loggedIn: "true",
        }
      })) {
        navigateToDashboard();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error.message);
    }
  };

  const userExists = async (email: string): Promise<boolean> => {
    try {
      const exists = await authService.userExists(email);
      return exists;
    } catch (error) {
      return false;
    }
  };

  return { login, logout, userExists, loading };
};