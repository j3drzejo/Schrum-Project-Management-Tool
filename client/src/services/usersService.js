import { axiosInstance } from './apiClient';

export const usersService = {
  getUsers: async () => {
    const { data } = await axiosInstance.get('/users');
    return data;
  },

  createUser: async (name, email, password, teamId) => {
    const { data } = await axiosInstance.post('/users', {
      name,
      email,
      password,
      teamId,
    });
    return data;
  },

  getUserById: async (userId) => {
    const { data } = await axiosInstance.get(`/users/${userId}`);
    return data;
  },

  updateUser: async (userId, name, email, password, teamId) => {
    const { data } = await axiosInstance.put(`/users/${userId}`, {
      name,
      email,
      password,
      teamId,
    });
    return data;
  },

  deleteUser: async (userId) => {
    const { data } = await axiosInstance.delete(`/users/${userId}`);
    return data;
  },
};
