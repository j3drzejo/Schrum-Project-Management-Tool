import { axiosInstance } from './apiClient';

export const teamInvitesService = {
  addUserToTeam: async (teamId, email) => {
    const { data } = await axiosInstance.post(`/teams/invites/${teamId}`, {
      email,
    });
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

  getPendingInvites: async () => {
    const { data } = await axiosInstance.get('/teams/invites/pending');
    return data;
  },
};
