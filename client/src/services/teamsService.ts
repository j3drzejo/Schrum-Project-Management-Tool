import { axiosInstance } from './apiClient';
import { CreateTeamDto, UpdateTeamDto } from '../types';

export const teamsService = {
  getTeams: async () => {
    const { data } = await axiosInstance.get('/teams');
    return data;
  },

  createTeam: async (body: CreateTeamDto) => {
    const { data } = await axiosInstance.post('/teams', body);
    return data;
  },

  getAllTeams: async () => {
    const { data } = await axiosInstance.get('/teams/all');
    return data;
  },

  getTeamById: async (id: number) => {
    const { data } = await axiosInstance.get(`/teams/${id}`);
    return data;
  },

  updateTeam: async (id: number, body: UpdateTeamDto) => {
    const { data } = await axiosInstance.put(`/teams/${id}`, body);
    return data;
  },

  deleteTeam: async (id: number) => {
    const { data } = await axiosInstance.delete(`/teams/${id}`);
    return data;
  },
};
