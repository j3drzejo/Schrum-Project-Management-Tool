import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Task, User, BoardColumn } from 'src/typeORM';

@Entity()
export class TaskHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.history)
  task: Task;

  @ManyToOne(() => User, (user) => user.histories)
  user: User;

  @ManyToOne(() => BoardColumn, { nullable: true })
  fromColumn?: BoardColumn;

  @ManyToOne(() => BoardColumn)
  toColumn: BoardColumn;

  @CreateDateColumn({ type: 'datetime' })
  timestamp: Date;

  @Column({ nullable: true, type: 'text' })
  note?: string;
}
