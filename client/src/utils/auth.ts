import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

// Custom hook for authentication
export const useAuth = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const signIn = useSignIn();
  const signOut = useSignOut();

  // Function to sign out
  const signout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  // Function to sign in
  const signin = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('login', { email, password });
      const token = response.data.token;

      // Use the signIn hook to authenticate
      if (signIn({
        auth: {
          token: token,
          type: 'Bearer'
        },
        userState: {
          email: email,
        }
      })) {
        navigate("/dashboard", { replace: true });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error signing in:", error);
      return false;
    }
  };

  // Function to check if user exists
  const userExists = async (email: string): Promise<boolean> => {
    try {
      const response = await axios.post('user-exists', { email });
      return response.data.exists;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  // Return functions and navigate
  return { signin, signout, userExists};
};