import { axiosInstance } from './apiClient';

export const teamsService = {
  getTeams: async () => {
    const { data } = await axiosInstance.get('/teams');
    return data;
  },

  createTeam: async (name) => {
    const { data } = await axiosInstance.post('/teams', { name });
    return data;
  },

  getAllTeams: async () => {
    const { data } = await axiosInstance.get('/teams/all');
    return data;
  },

  getTeamById: async (id) => {
    const { data } = await axiosInstance.get(`/teams/${id}`);
    return data;
  },

  updateTeam: async (id, name) => {
    const { data } = await axiosInstance.put(`/teams/${id}`, { name });
    return data;
  },

  deleteTeam: async (id) => {
    const { data } = await axiosInstance.delete(`/teams/${id}`);
    return data;
  },
};
