import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Label } from './label.entity';

@Entity()
export class TaskLabel {
  @PrimaryColumn()
  taskId: number;

  @PrimaryColumn()
  labelId: number;

  @ManyToOne(() => Task, (task) => task.labels, { eager: false })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @ManyToOne(() => Label, (label) => label.taskLinks, { eager: false })
  @JoinColumn({ name: 'labelId' })
  label: Label;
}
