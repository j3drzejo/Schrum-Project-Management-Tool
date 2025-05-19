import { axiosInstance } from './apiClient';

export const authService = {
  login: async (credentials) => {
    const { data } = await axiosInstance.post('/auth/login', credentials);
    console.log(data);
    return data;
  },

  register: async (dataObj) => {
    const { data } = await axiosInstance.post('/auth/register', dataObj);
    return data;
  },

  validateUser: async (token) => {
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
