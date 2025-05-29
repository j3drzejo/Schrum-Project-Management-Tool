export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

export interface CreateTeamDto {
  name: string;
  description?: string;
}

export interface UpdateTeamDto {
  name?: string;
  description?: string;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  teamId: number;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  teamId?: number;
}

export interface CreateSprintDto {
  name: string;
  startDate: string;
  endDate: string;
  projectId: number;
}

export interface UpdateSprintDto {
  name?: string;
  startDate?: string;
  endDate?: string;
  projectId?: number;
}

export interface CreateBoardDto {
  name: string;
  sprintId: number;
}

export interface UpdateBoardDto {
  name?: string;
  sprintId?: number;
}

export interface CreateBoardColumnDto {
  name: 'ready' | 'in-progress' | 'in-review' | 'in-testing' | 'ready-for-prod';
  position: number;
  boardId: number;
}

export interface UpdateBoardColumnDto {
  name?:
    | 'ready'
    | 'in-progress'
    | 'in-review'
    | 'in-testing'
    | 'ready-for-prod';
  position?: number;
  boardId?: number;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  projectId: number;
  sprintId?: number;
  boardColumnId: number;
  assignedUserId?: number;
  createdById: number;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  projectId?: number;
  sprintId?: number;
  boardColumnId?: number;
  assignedUserId?: number;
  createdById?: number;
}

export interface CreateLabelDto {
  name: string;
  color: string;
}

export interface UpdateLabelDto {
  name?: string;
  color?: string;
}

export interface CreateCommentDto {
  content: string;
  taskId: number;
  authorId: number;
}

export interface UpdateCommentDto {
  content?: string;
  taskId?: number;
  authorId?: number;
}

export interface CreateTeamInviteDto {
  teamId: number;
  invitedUserId: number;
  invitedById: number;
  accepted?: boolean;
}

export interface UpdateTeamInviteDto {
  teamId?: number;
  invitedUserId?: number;
  invitedById?: number;
  accepted?: boolean;
}

export interface CreateTaskLabelDto {
  taskId: number;
  labelId: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SystemStats {
  users: number;
  teams: number;
  projects: number;
  sprints: number;
  tasks: number;
  comments: number;
  labels: number;
}
