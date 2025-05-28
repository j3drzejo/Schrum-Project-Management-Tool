import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  Team,
  Task,
  Comment,
  TaskHistory,
  AccessToken,
  TeamInvite,
} from 'src/typeORM';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Team, (team: Team) => team.users)
  @JoinTable()
  teams: Team[];

  @OneToMany(() => Task, (task) => task.assignedUser)
  assignedTasks: Task[];

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => TaskHistory, (history) => history.user)
  histories: TaskHistory[];

  @OneToMany(() => AccessToken, (a) => a.user)
  accessTokens: AccessToken[];

  @OneToMany(() => TeamInvite, (invite) => invite.invitedUser)
  invites: TeamInvite[];

  @OneToMany(() => TeamInvite, (invite) => invite.invitedBy)
  sentInvites: TeamInvite[];

  @Column({ default: false })
  isAdmin?: boolean;
}
