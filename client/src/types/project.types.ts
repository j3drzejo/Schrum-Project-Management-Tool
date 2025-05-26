import { Team, Sprint, Task } from './index';

export interface Project {
  id: number;
  name: string;
  description?: string;
  team: Team;
  sprints?: Sprint[];
  tasks?: Task[];
}
