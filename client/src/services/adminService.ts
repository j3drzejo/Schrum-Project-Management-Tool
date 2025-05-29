import { axiosInstance } from './apiClient';
import {
  PaginatedResponse,
  CreateUserDto,
  UpdateUserDto,
  CreateTeamDto,
  UpdateTeamDto,
  CreateProjectDto,
  UpdateProjectDto,
  CreateSprintDto,
  UpdateSprintDto,
  CreateBoardDto,
  UpdateBoardDto,
  CreateBoardColumnDto,
  UpdateBoardColumnDto,
  CreateTaskDto,
  UpdateTaskDto,
  UpdateLabelDto,
  CreateCommentDto,
  UpdateCommentDto,
  CreateLabelDto,
  CreateTeamInviteDto,
  UpdateTeamInviteDto,
  CreateTaskLabelDto,
  SystemStats,
} from '../types/dtos/admin.types.dto';

export const adminService = {
  isAdmin: async (): Promise<boolean> => {
    const { data } = await axiosInstance.get('/admin/');
    return data;
  },

  getAllUsers: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/users?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getUserById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/users/${id}`);
    return data;
  },

  createUser: async (userData: CreateUserDto) => {
    console.log(userData);
    const { data } = await axiosInstance.post('/admin/users', userData);
    return data;
  },

  updateUser: async (id: number, userData: UpdateUserDto) => {
    const { data } = await axiosInstance.put(`/admin/users/${id}`, userData);
    return data;
  },

  deleteUser: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/users/${id}`);
    return data;
  },

  getAllTeams: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/teams?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getTeamById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/teams/${id}`);
    return data;
  },

  createTeam: async (teamData: CreateTeamDto) => {
    const { data } = await axiosInstance.post('/admin/teams', teamData);
    return data;
  },

  updateTeam: async (id: number, teamData: UpdateTeamDto) => {
    console.log(teamData);
    const { data } = await axiosInstance.put(`/admin/teams/${id}`, teamData);
    return data;
  },

  deleteTeam: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/teams/${id}`);
    return data;
  },

  getAllProjects: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/projects?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getProjectById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/projects/${id}`);
    return data;
  },

  createProject: async (projectData: CreateProjectDto) => {
    const { data } = await axiosInstance.post('/admin/projects', projectData);
    return data;
  },

  updateProject: async (id: number, projectData: UpdateProjectDto) => {
    const { data } = await axiosInstance.put(
      `/admin/projects/${id}`,
      projectData,
    );
    return data;
  },

  deleteProject: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/projects/${id}`);
    return data;
  },

  getAllSprints: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/sprints?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getSprintById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/sprints/${id}`);
    return data;
  },

  createSprint: async (sprintData: CreateSprintDto) => {
    const { data } = await axiosInstance.post('/admin/sprints', sprintData);
    return data;
  },

  updateSprint: async (id: number, sprintData: UpdateSprintDto) => {
    const { data } = await axiosInstance.put(
      `/admin/sprints/${id}`,
      sprintData,
    );
    return data;
  },

  deleteSprint: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/sprints/${id}`);
    return data;
  },

  getAllBoards: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/boards?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getBoardById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/boards/${id}`);
    return data;
  },

  createBoard: async (boardData: CreateBoardDto) => {
    const { data } = await axiosInstance.post('/admin/boards', boardData);
    return data;
  },

  updateBoard: async (id: number, boardData: UpdateBoardDto) => {
    const { data } = await axiosInstance.put(`/admin/boards/${id}`, boardData);
    return data;
  },

  deleteBoard: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/boards/${id}`);
    return data;
  },

  getAllBoardColumns: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/board-columns?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getBoardColumnById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/board-columns/${id}`);
    return data;
  },

  createBoardColumn: async (columnData: CreateBoardColumnDto) => {
    const { data } = await axiosInstance.post(
      '/admin/board-columns',
      columnData,
    );
    return data;
  },

  updateBoardColumn: async (id: number, columnData: UpdateBoardColumnDto) => {
    const { data } = await axiosInstance.put(
      `/admin/board-columns/${id}`,
      columnData,
    );
    return data;
  },

  deleteBoardColumn: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/board-columns/${id}`);
    return data;
  },

  getAllTasks: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/tasks?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getTaskById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/tasks/${id}`);
    return data;
  },

  createTask: async (taskData: CreateTaskDto) => {
    const { data } = await axiosInstance.post('/admin/tasks', taskData);
    return data;
  },

  updateTask: async (id: number, taskData: UpdateTaskDto) => {
    const { data } = await axiosInstance.put(`/admin/tasks/${id}`, taskData);
    return data;
  },

  deleteTask: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/tasks/${id}`);
    return data;
  },

  getAllLabels: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/labels?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getLabelById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/labels/${id}`);
    return data;
  },

  createLabel: async (labelData: CreateLabelDto) => {
    const { data } = await axiosInstance.post('/admin/labels', labelData);
    return data;
  },

  updateLabel: async (id: number, labelData: UpdateLabelDto) => {
    const { data } = await axiosInstance.put(`/admin/labels/${id}`, labelData);
    return data;
  },

  deleteLabel: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/labels/${id}`);
    return data;
  },

  getAllComments: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/comments?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getCommentById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/comments/${id}`);
    return data;
  },

  createComment: async (commentData: CreateCommentDto) => {
    const { data } = await axiosInstance.post('/admin/comments', commentData);
    return data;
  },

  updateComment: async (id: number, commentData: UpdateCommentDto) => {
    const { data } = await axiosInstance.put(
      `/admin/comments/${id}`,
      commentData,
    );
    return data;
  },

  deleteComment: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/comments/${id}`);
    return data;
  },

  getAllTeamInvites: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/team-invites?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getTeamInviteById: async (id: number) => {
    const { data } = await axiosInstance.get(`/admin/team-invites/${id}`);
    return data;
  },

  createTeamInvite: async (inviteData: CreateTeamInviteDto) => {
    const { data } = await axiosInstance.post(
      '/admin/team-invites',
      inviteData,
    );
    return data;
  },

  updateTeamInvite: async (id: number, inviteData: UpdateTeamInviteDto) => {
    const { data } = await axiosInstance.put(
      `/admin/team-invites/${id}`,
      inviteData,
    );
    return data;
  },

  deleteTeamInvite: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/team-invites/${id}`);
    return data;
  },

  getAllTaskLabels: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> => {
    const { data } = await axiosInstance.get(
      `/admin/task-labels?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getTaskLabel: async (taskId: number, labelId: number) => {
    const { data } = await axiosInstance.get(
      `/admin/task-labels/${taskId}/${labelId}`,
    );
    return data;
  },

  createTaskLabel: async (taskLabelData: CreateTaskLabelDto) => {
    const { data } = await axiosInstance.post(
      '/admin/task-labels',
      taskLabelData,
    );
    return data;
  },

  deleteTaskLabel: async (taskId: number, labelId: number) => {
    const { data } = await axiosInstance.delete(
      `/admin/task-labels/${taskId}/${labelId}`,
    );
    return data;
  },

  getSystemStats: async (): Promise<SystemStats> => {
    const { data } = await axiosInstance.get('/admin/stats');
    return data;
  },
};
