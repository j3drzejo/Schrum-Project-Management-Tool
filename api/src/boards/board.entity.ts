import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Sprint } from '../sprints/sprint.entity';
import { BoardColumn } from './board-column.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Sprint, (sprint) => sprint.board)
  sprint: Sprint;

  @Column()
  name: string;

  @OneToMany(() => BoardColumn, (col: BoardColumn) => col.board, {
    cascade: true,
  })
  columns: BoardColumn[];
}
