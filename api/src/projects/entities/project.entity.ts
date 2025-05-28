import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Team, Sprint, Task } from 'src/typeORM';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToOne(() => Team, (team) => team.projects, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  team: Team;

  @OneToMany(() => Sprint, (sprint) => sprint.project, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  sprints: Sprint[];

  @OneToMany(() => Task, (task) => task.project, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
