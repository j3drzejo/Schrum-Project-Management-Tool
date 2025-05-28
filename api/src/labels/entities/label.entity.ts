import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskLabel } from 'src/typeORM';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => TaskLabel, (tl: TaskLabel) => tl.label, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  taskLinks: TaskLabel[];
}
