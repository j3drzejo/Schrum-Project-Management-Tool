import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

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
}
