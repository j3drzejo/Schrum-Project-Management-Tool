import { CreateLabelDto, UpdateLabelDto, AddLabelToTaskDto } from '../types';
import { axiosInstance } from './apiClient';

export const labelsService = {
  getLabels: async () => {
    const { data } = await axiosInstance.get('/labels');
    return data;
  },

  createLabel: async (body: CreateLabelDto) => {
    const { data } = await axiosInstance.post('/labels', body);
    return data;
  },

  getLabelById: async (labelId: number) => {
    const { data } = await axiosInstance.get(`/labels/${labelId}`);
    return data;
  },

  updateLabel: async (labelId: number, body: UpdateLabelDto) => {
    const { data } = await axiosInstance.put(`/labels/${labelId}`, body);
    return data;
  },

  deleteLabel: async (labelId: number) => {
    const { data } = await axiosInstance.delete(`/labels/${labelId}`);
    return data;
  },

  getLabelsByTask: async (taskId: number) => {
    const { data } = await axiosInstance.get(`/labels/tasks/${taskId}/labels`);
    return data;
  },

  addLabelToTask: async (taskId: number, body: AddLabelToTaskDto) => {
    const { data } = await axiosInstance.post(
      `/labels/tasks/${taskId}/labels`,
      body,
    );
    return data;
  },

  removeLabelFromTask: async (taskId: number, labelId: number) => {
    const { data } = await axiosInstance.delete(
      `/labels/tasks/${taskId}/labels/${labelId}`,
    );
    return data;
  },
};
