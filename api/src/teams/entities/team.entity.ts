import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User, Project, TeamInvite } from 'src/typeORM';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToMany(() => User, (user) => user.teams, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  users: User[];

  @OneToMany(() => Project, (project) => project.team, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  projects: Project[];

  @OneToMany(() => TeamInvite, (invite) => invite.team, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  invites: TeamInvite[];
}
