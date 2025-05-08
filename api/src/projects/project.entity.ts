import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Team } from '../teams/team.entity';
import { Sprint } from '../sprints/sprint.entity';
import { Task } from '../tasks/task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToOne(() => Team, (team) => team.projects)
  team: Team;

  @OneToMany(() => Sprint, (sprint) => sprint.project)
  sprints: Sprint[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
