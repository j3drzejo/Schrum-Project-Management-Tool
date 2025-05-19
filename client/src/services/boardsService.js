import { axiosInstance } from './apiClient';

export const boardsService = {
  getBoardBySprint: async (sprintId) => {
    const { data } = await axiosInstance.get(`/sprints/${sprintId}/board`);
    return data;
  },

  updateBoard: async (boardId, name) => {
    const { data } = await axiosInstance.put(`/boards/${boardId}`, {
      name,
    });
    return data;
  },
};
