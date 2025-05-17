import axios from 'axios';
import { API_BASE } from './consts';

const axiosInstance = axios.create({
  baseURL: API_BASE + '/auth',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const login = async (credentials) => {
  return await axiosInstance.post('/login', credentials);
};

export const register = async (data) => {
  return await axiosInstance.post('/register', data);
};

export const validateUser = async (token) => {
  return await axiosInstance.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};