import { axiosInstance } from './apiClient';

export const boardColumnsService = {
  getColumnsByBoard: async (boardId) => {
    const { data } = await axiosInstance.get(`/boards/${boardId}/columns`);
    return data;
  },

  createColumn: async (boardId, name, position) => {
    const { data } = await axiosInstance.post(`/boards/${boardId}/columns`, {
      name,
      position,
    });
    return data;
  },

  getColumnById: async (columnId) => {
    const { data } = await axiosInstance.get(`/columns/${columnId}`);
    return data;
  },

  updateColumn: async (columnId, name, position) => {
    const { data } = await axiosInstance.put(`/columns/${columnId}`, {
      name,
      position,
    });
    return data;
  },

  deleteColumn: async (columnId) => {
    const { data } = await axiosInstance.delete(`/columns/${columnId}`);
    return data;
  },
};
