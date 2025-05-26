import { CreateUserDto, UpdateUserDto } from '../types';
import { axiosInstance } from './apiClient';

export const usersService = {
  getUsers: async () => {
    const { data } = await axiosInstance.get('/users');
    return data;
  },

  createUser: async (body: CreateUserDto) => {
    const { data } = await axiosInstance.post('/users', body);
    return data;
  },

  getUserById: async (userId: number) => {
    const { data } = await axiosInstance.get(`/users/${userId}`);
    return data;
  },

  updateUser: async (userId: number, body: UpdateUserDto) => {
    const { data } = await axiosInstance.put(`/users/${userId}`, body);
    return data;
  },

  deleteUser: async (userId: number) => {
    const { data } = await axiosInstance.delete(`/users/${userId}`);
    return data;
  },
};
