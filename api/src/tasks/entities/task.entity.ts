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
    cascade: true,
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  sprint?: Sprint;

  @ManyToOne(() => BoardColumn, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  boardColumn: BoardColumn;

  @ManyToOne(() => User, (user) => user.assignedTasks, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  assignedUser?: User;

  @ManyToOne(() => User, (user) => user.createdTasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  createdBy: User;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.task, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => TaskHistory, (history) => history.task, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  history: TaskHistory[];

  @OneToMany(() => TaskLabel, (tl) => tl.task, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  labels: TaskLabel[];
}
