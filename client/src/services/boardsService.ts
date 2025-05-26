import { axiosInstance } from './apiClient';
import { UpdateBoardDto, CreateBoardForSprintDto } from '../types';
export const boardsService = {
  getBoardBySprint: async (sprintId: number) => {
    const { data } = await axiosInstance.get(`/sprints/${sprintId}/board`);
    return data;
  },

  updateBoard: async (boardId: number, body: UpdateBoardDto) => {
    const { data } = await axiosInstance.put(`/boards/${boardId}`, body);
    return data;
  },

  createForSprint(sprintId, body: CreateBoardForSprintDto) {
    return axiosInstance.post(`/sprints/${sprintId}/board`, {
      body,
    });
  },
};
