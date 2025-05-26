import { CreateSprintDto, UpdateSprintDto } from '../types';
import { axiosInstance } from './apiClient';

export const sprintsService = {
  getSprints: async () => {
    const { data } = await axiosInstance.get('/sprints');
    return data;
  },

  createSprint: async (projectId: number, body: CreateSprintDto) => {
    const { data } = await axiosInstance.post(
      `/projects/${projectId}/sprints`,
      body,
    );
    return data;
  },

  getSprintById: async (sprintId: number) => {
    const { data } = await axiosInstance.get(`/sprints/${sprintId}`);
    return data;
  },

  updateSprint: async (sprintId: number, body: UpdateSprintDto) => {
    const { data } = await axiosInstance.put(`/sprints/${sprintId}`, body);
    return data;
  },

  deleteSprint: async (sprintId: number) => {
    const { data } = await axiosInstance.delete(`/sprints/${sprintId}`);
    return data;
  },

  getSprintsByProject: async (projectId: number) => {
    const { data } = await axiosInstance.get(
      `/projects/${projectId}/sprints/current`,
    );
    return data;
  },
};
