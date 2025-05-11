import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskLabel } from 'src/typeORM';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  color: string;

  @OneToMany(() => TaskLabel, (tl: TaskLabel) => tl.label)
  taskLinks: TaskLabel[];
}
