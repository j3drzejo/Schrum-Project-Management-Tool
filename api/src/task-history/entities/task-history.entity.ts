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

  @ManyToOne(() => Task, (task) => task.history, {
    onDelete: 'CASCADE',
  })
  task: Task;

  @ManyToOne(() => User, (user) => user.histories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user?: User;

  @ManyToOne(() => BoardColumn, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  fromColumn?: BoardColumn;

  @ManyToOne(() => BoardColumn, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  toColumn?: BoardColumn;

  @CreateDateColumn({ type: 'datetime' })
  timestamp: Date;

  @Column({ nullable: true, type: 'text' })
  note?: string;
}
