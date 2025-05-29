import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Project,
  Sprint,
  User,
  BoardColumn,
  Comment,
  TaskHistory,
  TaskLabel,
} from 'src/typeORM';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  sprint?: Sprint;

  @ManyToOne(() => BoardColumn, {
    onDelete: 'RESTRICT',
  })
  boardColumn: BoardColumn;

  @ManyToOne(() => User, (user) => user.assignedTasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  assignedUser?: User;

  @ManyToOne(() => User, (user) => user.createdTasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  createdBy?: User;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.task, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => TaskHistory, (history) => history.task, {
    cascade: true,
  })
  history: TaskHistory[];

  @OneToMany(() => TaskLabel, (tl) => tl.task, {
    cascade: true,
  })
  labels: TaskLabel[];
}
