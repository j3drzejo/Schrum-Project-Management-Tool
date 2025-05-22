import { axiosInstance } from './apiClient';

export const tasksService = {
  getTasks: async () => {
    const { data } = await axiosInstance.get('/tasks');
    return data;
  },

  getTaskById: async (taskId) => {
    const { data } = await axiosInstance.get(`/tasks/${taskId}`);
    return data;
  },

  updateTask: async (taskId, taskData) => {
    const { data } = await axiosInstance.put(`/tasks/${taskId}`, taskData);
    return data;
  },

  deleteTask: async (taskId) => {
    const { data } = await axiosInstance.delete(`/tasks/${taskId}`);
    return data;
  },

  createTask: async (projectId, taskData) => {
    const { data } = await axiosInstance.post(
      `/projects/${projectId}/tasks`,
      taskData,
    );
    return data;
  },

  getTasksByProject: async (projectId) => {
    const { data } = await axiosInstance.get(`/projects/${projectId}/tasks`);
    return data;
  },

  getTasksBySprint: async (sprintId) => {
    const { data } = await axiosInstance.get(`/sprints/${sprintId}/tasks`);
    return data;
  },

  assignTask: async (taskId, userId) => {
    const { data } = await axiosInstance.patch(`/tasks/${taskId}/assign`, {
      userId,
    });
    return data;
  },

  moveTask: async (taskId, columnId, note) => {
    const { data } = await axiosInstance.patch(`/tasks/${taskId}/move`, {
      columnId,
      note,
    });
    return data;
  },

  getTaskLabels: async (taskId) => {
    const { data } = await axiosInstance.get(`/tasks/${taskId}/labels`);
    console.log(data);
    return data;
  },

  addTaskLabel: async (taskId, labelData) => {
    const { data } = await axiosInstance.post(
      `/tasks/${taskId}/labels`,
      labelData,
    );
    return data;
  },

  deleteTaskLabel: async (taskId, labelId) => {
    const { data } = await axiosInstance.delete(
      `/tasks/${taskId}/labels/${labelId}`,
    );
    return data;
  },
};
