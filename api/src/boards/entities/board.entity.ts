import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Sprint, BoardColumn } from 'src/typeORM';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Sprint, (sprint) => sprint.board, {
    onDelete: 'CASCADE',
  })
  sprint: Sprint;

  @Column()
  name: string;

  @OneToMany(() => BoardColumn, (col: BoardColumn) => col.board, {
    cascade: true,
  })
  columns: BoardColumn[];
}
