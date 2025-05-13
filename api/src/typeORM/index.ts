import { Project } from 'src/projects/entities/project.entity';
import { Sprint } from 'src/sprints/entities/sprint.entity';
import { Board } from 'src/boards/entities/board.entity';
import { BoardColumn } from 'src/boards/entities/board-column.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { TaskHistory } from 'src/taskHistory/entities/task-history.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Label } from 'src/labels/entities/label.entity';
import { TaskLabel } from 'src/labels/entities/task-label.entity';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/users/entities/user.entity';
import { AccessToken } from 'src/auth/entities/access-token.entity';
import { TeamInvite } from 'src/teams/entities/team-invite.entity';

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
  AccessToken,
  TeamInvite,
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
  AccessToken,
  TeamInvite,
};
export default entities;
