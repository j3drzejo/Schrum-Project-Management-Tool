import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Board } from 'src/typeORM';
import { UpdateBoardDto } from '../dtos';

const STATUSES = [
  'ready',
  'in-progress',
  'in-review',
  'in-testing',
  'ready-for-prod',
] as const;

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardRepo: Repository<Board>) {}

  async getBySprint(sprintId: number): Promise<Board> {
    const board = await this.boardRepo.findOne({
      where: { sprint: { id: sprintId } },
      relations: ['columns'],
    });
    if (!board) {
      throw new NotFoundException(`Board for sprint ${sprintId} not found`);
    }
    return board;
  }

  async update(boardId: number, dto: UpdateBoardDto): Promise<Board> {
    const board = await this.boardRepo.preload({ id: boardId, ...dto });
    if (!board) {
      throw new NotFoundException(`Board #${boardId} not found`);
    }
    return this.boardRepo.save(board);
  }

  async createForSprint(sprintId: number, name?: string): Promise<Board> {
    const board = this.boardRepo.create({
      name: name ?? `Sprint ${sprintId} Board`,
      sprint: { id: sprintId },
      columns: STATUSES.map((status, index) => ({
        name: status,
        position: index,
      })),
    });
    return this.boardRepo.save(board);
  }
}
