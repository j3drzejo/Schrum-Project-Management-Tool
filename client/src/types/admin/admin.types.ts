export type TabId =
  | 'stats'
  | 'users'
  | 'teams'
  | 'projects'
  | 'sprints'
  | 'boards'
  | 'board-columns'
  | 'tasks'
  | 'labels'
  | 'comments'
  | 'team-invites'
  | 'task-labels';

export type ModalMode = 'create' | 'edit' | 'view';

export interface FormDataType {
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  description?: string;
  teamId?: number;
  startDate?: string;
  endDate?: string;
  projectId?: number;
  sprintId?: number;
  position?: number;
  boardId?: number;
  title?: string;
  boardColumnId?: number;
  assignedUserId?: number;
  createdById?: number;
  color?: string;
  content?: string;
  taskId?: number;
  authorId?: number;
  invitedUserId?: number;
  invitedById?: number;
  accepted?: boolean;
  labelId?: number;
  id?: number;
}
