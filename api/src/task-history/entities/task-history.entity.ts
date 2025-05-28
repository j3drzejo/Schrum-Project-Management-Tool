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
    cascade: true,
    onDelete: 'CASCADE',
  })
  task: Task;

  @ManyToOne(() => User, (user) => user.histories, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => BoardColumn, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  fromColumn?: BoardColumn;

  @ManyToOne(() => BoardColumn, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  toColumn: BoardColumn;

  @CreateDateColumn({ type: 'datetime' })
  timestamp: Date;

  @Column({ nullable: true, type: 'text' })
  note?: string;
}
