import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Task, Label } from 'src/typeORM';

@Entity()
export class TaskLabel {
  @PrimaryColumn()
  taskId: number;

  @PrimaryColumn()
  labelId: number;

  @ManyToOne(() => Task, (task) => task.labels, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @ManyToOne(() => Label, (label) => label.taskLinks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'labelId' })
  label: Label;
}
