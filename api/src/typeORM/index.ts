import { Project } from 'src/projects/project.entity';
import { Sprint } from 'src/sprints/sprint.entity';
import { Board } from 'src/boards/board.entity';
import { BoardColumn } from 'src/boards/board-column.entity';
import { Task } from 'src/tasks/task.entity';
import { TaskHistory } from 'src/task-history/task-history.entity';
import { Comment } from 'src/comments/comment.entity';
import { Label } from 'src/labels/label.entity';
import { TaskLabel } from 'src/labels/task-label.entity';
import { Team } from 'src/teams/team.entity';
import { User } from 'src/users/user.entity';

const entities = [
  Team,
  User,
  Project,
  Sprint,
  Board,
  BoardColumn,
  Task,
  TaskHistory,
  Label,
  TaskLabel,
  Comment,
];

export {
  Team,
  User,
  Project,
  Sprint,
  Board,
  BoardColumn,
  Task,
  TaskHistory,
  Label,
  TaskLabel,
  Comment,
};
export default entities;
