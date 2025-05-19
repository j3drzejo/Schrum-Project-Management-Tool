import { axiosInstance } from './apiClient';

export const sidebarService = {
  getUserInfo: async () => {
    const { data } = await axiosInstance.get('/auth/profile');
    return data;
  },

  getTeams: async () => {
    const { data } = await axiosInstance.get('/teams');
    return data;
  },

  addUserToTeam: async (teamId, email) => {
    const { data } = await axiosInstance.post(`/teams/invites/${teamId}`, {
      email,
    });
    return data;
  },

  createProject: async (teamId, projectName, description = 'desc') => {
    const { data } = await axiosInstance.post('/projects', {
      name: projectName,
      description,
      teamId,
    });
    return data;
  },

  createTeam: async (teamName) => {
    const { data } = await axiosInstance.post('/teams', { name: teamName });
    return data;
  },

  getInvites: async () => {
    const { data } = await axiosInstance.get('/teams/invites/pending');
    return data;
  },

  acceptInvite: async (inviteId) => {
    await axiosInstance.post(`/teams/invites/${inviteId}/accept`);
    return { success: true };
  },

  declineInvite: async (inviteId) => {
    await axiosInstance.delete(`/teams/invites/${inviteId}/decline`);
    return { success: true };
  },
};
