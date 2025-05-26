import { axiosInstance } from './apiClient';
import {
  CreateTaskDto,
  UpdateTaskDto,
  AssignUserDto,
  MoveTaskDto,
  UpdateLabelDto,
} from '../types';
export const tasksService = {
  getTasks: async () => {
    const { data } = await axiosInstance.get('/tasks');
    return data;
  },

  getTaskById: async (taskId: number) => {
    const { data } = await axiosInstance.get(`/tasks/${taskId}`);
    return data;
  },

  updateTask: async (taskId: number, body: UpdateTaskDto) => {
    const { data } = await axiosInstance.put(`/tasks/${taskId}`, body);
    return data;
  },

  deleteTask: async (taskId: number) => {
    const { data } = await axiosInstance.delete(`/tasks/${taskId}`);
    return data;
  },

  createTask: async (projectId: number, body: CreateTaskDto) => {
    const { data } = await axiosInstance.post(
      `/projects/${projectId}/tasks`,
      body,
    );
    return data;
  },

  getTasksByProject: async (projectId: number) => {
    const { data } = await axiosInstance.get(`/projects/${projectId}/tasks`);
    return data;
  },

  getTasksBySprint: async (sprintId: number) => {
    const { data } = await axiosInstance.get(`/sprints/${sprintId}/tasks`);
    return data;
  },

  assignTask: async (taskId: number, body: AssignUserDto) => {
    const { data } = await axiosInstance.patch(`/tasks/${taskId}/assign`, body);
    return data;
  },

  moveTask: async (taskId: number, body: MoveTaskDto) => {
    const { data } = await axiosInstance.patch(`/tasks/${taskId}/move`, body);
    return data;
  },

  getTaskLabels: async (taskId: number) => {
    const { data } = await axiosInstance.get(`/tasks/${taskId}/labels`);
    console.log(data);
    return data;
  },

  addTaskLabel: async (taskId: number, body: UpdateLabelDto) => {
    const { data } = await axiosInstance.post(`/tasks/${taskId}/labels`, body);
    return data;
  },

  deleteTaskLabel: async (taskId: number, labelId: number) => {
    const { data } = await axiosInstance.delete(
      `/tasks/${taskId}/labels/${labelId}`,
    );
    return data;
  },
};
