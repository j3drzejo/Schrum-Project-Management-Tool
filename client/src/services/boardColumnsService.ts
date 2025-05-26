import { axiosInstance } from './apiClient';
import {
  CreateBoardColumnDto,
  UpdateBoardColumnDto,
  UpdateBoardDto,
} from '../types';
export const boardColumnsService = {
  getColumnsByBoard: async (boardId: number) => {
    const { data } = await axiosInstance.get(`/boards/${boardId}/columns`);
    return data;
  },

  createColumn: async (boardId: number, body: CreateBoardColumnDto) => {
    const { data } = await axiosInstance.post(
      `/boards/${boardId}/columns`,
      body,
    );
    return data;
  },

  getColumnById: async (columnId: number) => {
    const { data } = await axiosInstance.get(`/columns/${columnId}`);
    return data;
  },

  updateColumn: async (columnId: number, body: UpdateBoardColumnDto) => {
    const { data } = await axiosInstance.put(`/columns/${columnId}`, body);
    return data;
  },

  deleteColumn: async (columnId: number) => {
    const { data } = await axiosInstance.delete(`/columns/${columnId}`);
    return data;
  },
};
