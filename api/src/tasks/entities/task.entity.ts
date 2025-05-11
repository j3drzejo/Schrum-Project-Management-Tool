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

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks, { nullable: true })
  sprint?: Sprint;

  @ManyToOne(() => BoardColumn)
  boardColumn: BoardColumn;

  @ManyToOne(() => User, (user) => user.assignedTasks, { nullable: true })
  assignedUser?: User;

  @ManyToOne(() => User, (user) => user.createdTasks)
  createdBy: User;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @OneToMany(() => TaskHistory, (history) => history.task)
  history: TaskHistory[];

  @OneToMany(() => TaskLabel, (tl) => tl.task)
  labels: TaskLabel[];
}
