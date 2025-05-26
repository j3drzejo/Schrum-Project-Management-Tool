import { Task, User } from './index';

export interface Comment {
  id: number;
  task: Task;
  author: User;
  content: string;
  createdAt: string;
  updatedAt?: string;
}
