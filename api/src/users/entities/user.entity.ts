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

  @ManyToMany(() => Team, (team: Team) => team.users, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  teams: Team[];

  @OneToMany(() => Task, (task) => task.assignedUser, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  assignedTasks: Task[];

  @OneToMany(() => Task, (task) => task.createdBy, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  createdTasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => TaskHistory, (history) => history.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  histories: TaskHistory[];

  @OneToMany(() => AccessToken, (a) => a.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  accessTokens: AccessToken[];

  @OneToMany(() => TeamInvite, (invite) => invite.invitedUser, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  invites: TeamInvite[];

  @OneToMany(() => TeamInvite, (invite) => invite.invitedBy, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  sentInvites: TeamInvite[];

  @Column({ default: false })
  isAdmin?: boolean;
}
