import { Project, Sprint, BoardColumn, User, Label } from './index';

export interface Task {
  id: number;
  title: string;
  description?: string;
  project: Project;
  sprint?: Sprint;
  boardColumn: BoardColumn;
  assignedUser?: User;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
  history?: TaskHistory[];
  labels?: TaskLabel[];
}

export interface TaskHistory {
  id: number;
  task: Task;
  user: User;
  fromColumn?: BoardColumn;
  toColumn: BoardColumn;
  timestamp: string;
  note?: string;
}

export interface TaskLabel {
  taskId: number;
  labelId: number;
  task: Task;
  label: Label;
}
