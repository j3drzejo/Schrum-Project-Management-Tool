import { axiosInstance } from './apiClient';
import { InviteUserDto } from '../types';
export const teamInvitesService = {
  addUserToTeam: async (teamId: number, body: InviteUserDto) => {
    const { data } = await axiosInstance.post(`/teams/invites/${teamId}`, body);
    return data;
  },

  acceptInvite: async (inviteId: number) => {
    await axiosInstance.post(`/teams/invites/${inviteId}/accept`);
    return { success: true };
  },

  declineInvite: async (inviteId: number) => {
    await axiosInstance.delete(`/teams/invites/${inviteId}/decline`);
    return { success: true };
  },

  getPendingInvites: async () => {
    const { data } = await axiosInstance.get('/teams/invites/pending');
    return data;
  },
};
