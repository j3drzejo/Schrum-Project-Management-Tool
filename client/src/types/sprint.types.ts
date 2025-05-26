import { Project, Board, Task } from './index';

export interface Sprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  project: Project;
  board?: Board;
  tasks?: Task[];
}
