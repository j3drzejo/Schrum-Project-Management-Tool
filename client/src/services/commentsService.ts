import { CreateCommentDto, UpdateCommentDto } from '../types';
import { axiosInstance } from './apiClient';

export const commentsService = {
  getCommentsByTask: async (taskId: number) => {
    const { data } = await axiosInstance.get(`/tasks/${taskId}/comments`);
    return data;
  },

  createComment: async (taskId: number, body: CreateCommentDto) => {
    const { data } = await axiosInstance.post(
      `/tasks/${taskId}/comments`,
      body,
    );
    return data;
  },

  getCommentById: async (commentId: number) => {
    const { data } = await axiosInstance.get(`/comments/${commentId}`);
    return data;
  },

  updateComment: async (commentId, body: UpdateCommentDto) => {
    const { data } = await axiosInstance.put(`/comments/${commentId}`, body);
    console.log(data);
    return data;
  },

  deleteComment: async (commentId: number) => {
    const { data } = await axiosInstance.delete(`/comments/${commentId}`);
    return data;
  },
};
