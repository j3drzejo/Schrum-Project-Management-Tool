import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Task, User } from 'src/typeORM';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.comments)
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column('text')
  content: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt?: Date;
}
