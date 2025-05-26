import { User, Project } from './index';

export interface Team {
  id: number;
  name: string;
  description?: string;
  users?: User[];
  projects?: Project[];
  invites?: TeamInvite[];
}

export interface TeamInvite {
  id: number;
  team: Team;
  invitedUser: User;
  invitedBy: User;
  accepted: boolean;
}
