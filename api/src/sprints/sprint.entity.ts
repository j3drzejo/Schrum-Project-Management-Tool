import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { Board } from '../boards/board.entity';
import { Task } from '../tasks/task.entity';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @ManyToOne(() => Project, (project) => project.sprints)
  project: Project;

  @OneToOne(() => Board, (board) => board.sprint, { cascade: true })
  @JoinColumn()
  board: Board;

  @OneToMany(() => Task, (task) => task.sprint)
  tasks: Task[];
}
