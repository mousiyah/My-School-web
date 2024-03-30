export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');

    return !!token;
  };

export const signout = (): void => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      window.location.href = '/';
    } else {
        alert('Error: Unable to sign out');
    }
  };
  
export const login = (token: string): void => {
    localStorage.setItem('token', token);
    window.location.href = '/dashboard';
};