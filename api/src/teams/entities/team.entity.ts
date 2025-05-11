import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User, Project, TeamInvite } from 'src/typeORM';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @OneToMany(() => User, (user) => user.team)
  users: User[];

  @OneToMany(() => Project, (project) => project.team)
  projects: Project[];

  @OneToMany(() => TeamInvite, (invite) => invite.team)
  invites: TeamInvite[];
}
