import { Team, Task, TaskHistory, TeamInvite } from './index';

export interface User {
  id: number;
  name: string;
  email: string;
  teams?: Team[];
  assignedTasks?: Task[];
  createdTasks?: Task[];
  comments?: Comment[];
  histories?: TaskHistory[];
  accessTokens?: AccessToken[];
  invites?: TeamInvite[];
  sentInvites?: TeamInvite[];
}

export interface AccessToken {
  jti: string;
  user: User;
  expiresAt: string;
  createdAt: string;
}
