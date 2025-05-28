import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Check,
} from 'typeorm';
import { Board } from 'src/typeORM';

const STATUSES = [
  'ready',
  'in-progress',
  'in-review',
  'in-testing',
  'ready-for-prod',
] as const;

type Status = (typeof STATUSES)[number];

@Entity()
@Check(`name IN (${STATUSES.map((s) => `'${s}'`).join(', ')})`)
export class BoardColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  board: Board;

  @Column()
  name: Status;

  @Column('int')
  position: number;
}
