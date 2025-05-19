import { axiosInstance } from './apiClient';

export const projectsService = {
  getProjects: async () => {
    const { data } = await axiosInstance.get('/projects');
    return data;
  },

  createProject: async (name, description, teamId) => {
    const { data } = await axiosInstance.post('/projects', {
      name,
      description,
      teamId,
    });
    return data;
  },

  getProjectsByTeam: async (teamId) => {
    const { data } = await axiosInstance.get(`/teams/${teamId}/projects`);
    return data;
  },

  createProjectForTeam: async (teamId, name, description = '') => {
    const { data } = await axiosInstance.post(`/teams/${teamId}/projects`, {
      name,
      description,
    });
    return data;
  },

  getProjectById: async (projectId) => {
    const { data } = await axiosInstance.get(`/projects/${projectId}`);
    return data;
  },

  updateProject: async (projectId, name, description) => {
    const { data } = await axiosInstance.put(`/projects/${projectId}`, {
      name,
      description,
    });
    return data;
  },

  deleteProject: async (projectId) => {
    const { data } = await axiosInstance.delete(`/projects/${projectId}`);
    return data;
  },
};
