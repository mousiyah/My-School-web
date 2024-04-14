import { useState } from 'react';

import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import createRefresh from 'react-auth-kit/createRefresh';

import { authApi } from 'api/authApi';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();
  const signOut = useSignOut();

  const logout = async (): Promise<void> => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const {accessToken, refreshToken } = await authApi.login(email, password);
      if (signIn({
        auth: {
          token: accessToken,
          type: 'Bearer'
        },
        userState: {
          loggedIn: "true",
        }
      })) {
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error.message);
    }
  };

  const userExists = async (email: string): Promise<boolean> => {
    try {
      const exists = await authApi.userExists(email);
      return exists;
    } catch (error) {
      return false;
    }
  };

  return { login, logout, userExists, loading };
};