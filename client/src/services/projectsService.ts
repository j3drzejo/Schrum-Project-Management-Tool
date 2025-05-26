import { axiosInstance } from './apiClient';
import { CreateProjectDto, UpdateProjectDto } from '../types/index';

export const projectsService = {
  getProjects: async () => {
    const { data } = await axiosInstance.get('/projects');
    return data;
  },

  createProject: async (body: CreateProjectDto) => {
    const { data } = await axiosInstance.post('/projects', body);
    return data;
  },

  getProjectsByTeam: async (teamId: number) => {
    const { data } = await axiosInstance.get(`/teams/${teamId}/projects`);
    return data;
  },

  createProjectForTeam: async (teamId: number, body: UpdateProjectDto) => {
    const { data } = await axiosInstance.post(
      `/teams/${teamId}/projects`,
      body,
    );
    return data;
  },

  getProjectById: async (projectId: number) => {
    const { data } = await axiosInstance.get(`/projects/${projectId}`);
    return data;
  },

  updateProject: async (projectId: number, body: UpdateProjectDto) => {
    const { data } = await axiosInstance.put(`/projects/${projectId}`, body);
    return data;
  },

  deleteProject: async (projectId: number) => {
    const { data } = await axiosInstance.delete(`/projects/${projectId}`);
    return data;
  },
};
