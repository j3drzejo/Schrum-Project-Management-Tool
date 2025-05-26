import { axiosInstance } from './apiClient';

export const taskHistoryService = {
  getTaskHistory: async (taskId: number) => {
    const { data } = await axiosInstance.get(`/tasks/${taskId}/history`);
    return data;
  },
};
