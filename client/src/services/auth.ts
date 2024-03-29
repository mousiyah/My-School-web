import axios from 'axios';

export async function login(email, password) {
  try {
    const response = await axios.post('login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
