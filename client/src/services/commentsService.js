import { axiosInstance } from './apiClient';

export const commentsService = {
  getCommentsByTask: async (taskId) => {
    const { data } = await axiosInstance.get(`/tasks/${taskId}/comments`);
    return data;
  },

  createComment: async (taskId, content) => {
    const { data } = await axiosInstance.post(`/tasks/${taskId}/comments`, {
      content,
    });
    return data;
  },

  getCommentById: async (commentId) => {
    const { data } = await axiosInstance.get(`/comments/${commentId}`);
    return data;
  },

  updateComment: async (commentId, content) => {
    console.log('Updating comment with ID:', commentId);
    console.log('New content:', content);
    const { data } = await axiosInstance.put(`/comments/${commentId}`, {
      content,
    });
    console.log(data);
    return data;
  },

  deleteComment: async (commentId) => {
    const { data } = await axiosInstance.delete(`/comments/${commentId}`);
    return data;
  },
};
