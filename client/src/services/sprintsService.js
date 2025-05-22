import { axiosInstance } from './apiClient';

export const sprintsService = {
  getSprints: async () => {
    const { data } = await axiosInstance.get('/sprints');
    return data;
  },

  createSprint: async (projectId, name, startDate, endDate) => {
    const { data } = await axiosInstance.post(
      `/projects/${projectId}/sprints`,
      {
        name,
        startDate,
        endDate,
      },
    );
    return data;
  },

  getSprintById: async (sprintId) => {
    const { data } = await axiosInstance.get(`/sprints/${sprintId}`);
    return data;
  },

  updateSprint: async (sprintId, name, startDate, endDate) => {
    const { data } = await axiosInstance.put(`/sprints/${sprintId}`, {
      name,
      startDate,
      endDate,
    });
    return data;
  },

  deleteSprint: async (sprintId) => {
    const { data } = await axiosInstance.delete(`/sprints/${sprintId}`);
    return data;
  },

  getSprintsByProject: async (projectId) => {
    const { data } = await axiosInstance.get(
      `/projects/${projectId}/sprints/current`,
    );
    return data;
  },
};
