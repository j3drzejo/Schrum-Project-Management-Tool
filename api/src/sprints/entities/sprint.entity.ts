import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Project, Board, Task } from 'src/typeORM';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => Project, (project) => project.sprints)
  project: Project;

  @OneToOne(() => Board, (board) => board.sprint, { cascade: true })
  @JoinColumn()
  board: Board;

  @OneToMany(() => Task, (task) => task.sprint)
  tasks: Task[];
}
