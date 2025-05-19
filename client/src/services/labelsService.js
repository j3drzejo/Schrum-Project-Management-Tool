import { axiosInstance } from './apiClient';

export const labelsService = {
  getLabels: async () => {
    const { data } = await axiosInstance.get('/labels');
    return data;
  },

  createLabel: async (name, color) => {
    const { data } = await axiosInstance.post('/labels', { name, color });
    return data;
  },

  getLabelById: async (labelId) => {
    const { data } = await axiosInstance.get(`/labels/${labelId}`);
    return data;
  },

  updateLabel: async (labelId, updateData) => {
    const { data } = await axiosInstance.put(`/labels/${labelId}`, updateData);
    return data;
  },

  deleteLabel: async (labelId) => {
    const { data } = await axiosInstance.delete(`/labels/${labelId}`);
    return data;
  },

  getLabelsByTask: async (taskId) => {
    const { data } = await axiosInstance.get(`/labels/tasks/${taskId}/labels`);
    return data;
  },

  addLabelToTask: async (taskId, labelData) => {
    const { data } = await axiosInstance.post(
      `/labels/tasks/${taskId}/labels`,
      labelData,
    );
    return data;
  },

  removeLabelFromTask: async (taskId, labelId) => {
    const { data } = await axiosInstance.delete(
      `/labels/tasks/${taskId}/labels/${labelId}`,
    );
    return data;
  },
};
