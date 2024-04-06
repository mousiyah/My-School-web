import { useState } from 'react';

import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import createRefresh from 'react-auth-kit/createRefresh';

import { useNavigate } from 'hooks/useNavigate';
import { userService } from 'services/apiService';

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
      const {accessToken, refreshToken } = await userService.login(email, password);
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
      const exists = await userService.userExists(email);
      return exists;
    } catch (error) {
      return false;
    }
  };

  const getAccessToken = (): string | null => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === '_auth') {
        return value;
      }
    }
    return null;
  };

  return { login, logout, userExists, loading, getAccessToken };
};