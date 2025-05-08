import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Team } from '../teams/team.entity';
import { Task } from '../tasks/task.entity';
import { Comment } from '../comments/comment.entity';
import { TaskHistory } from '../task-history/task-history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Team, (team) => team.users)
  team: Team;

  @OneToMany(() => Task, (task) => task.assignedUser)
  assignedTasks: Task[];

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => TaskHistory, (history) => history.user)
  histories: TaskHistory[];
}
