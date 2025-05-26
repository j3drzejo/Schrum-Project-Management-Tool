import { TaskLabel } from './index';

export interface Label {
  id: number;
  name: string;
  color: string;
  taskLinks?: TaskLabel[];
}
