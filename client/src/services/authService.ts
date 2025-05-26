import { axiosInstance } from './apiClient';
import { LoginDto, RegisterDto } from '../types';
export const authService = {
  login: async (body: LoginDto) => {
    const { data } = await axiosInstance.post('/auth/login', body);
    console.log(data);
    return data;
  },

  register: async (body: RegisterDto) => {
    const { data } = await axiosInstance.post('/auth/register', body);
    return data;
  },

  validateUser: async (token: any | null) => {
    const { data } = await axiosInstance.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  logout: async () => {
    const { data } = await axiosInstance.post('/auth/logout');
    return data;
  },
};
