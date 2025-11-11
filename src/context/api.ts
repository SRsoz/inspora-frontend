import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lägg till JWT-token i varje request
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const getAllUsers = () => api.get('/users');
export const createUser = (userData: { username: string; email: string; password: string; role?: string }) =>
  api.post('/users/register', userData);
export const updateUser = (id: string, userData: { username?: string; email?: string; password?: string; role?: string }) =>
  api.put(`/users/${id}`, userData);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);

export default api;