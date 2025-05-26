import { Sprint, Task } from './index';

export interface Board {
  id: number;
  name: string;
  sprint: Sprint;
  columns?: BoardColumn[];
}

export interface BoardColumn {
  id: number;
  name: string;
  position: number;
  board: Board;
  tasks?: Task[];
}
