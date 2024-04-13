import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000'
});

api.interceptors.request.use(config => {
  const accessToken = getAccessToken();
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.data && error.response.data.error) {
    throw new Error(error.response.data.error);
  } else {
    throw new Error('An error occurred while processing the request');
  }
});

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

export default api;