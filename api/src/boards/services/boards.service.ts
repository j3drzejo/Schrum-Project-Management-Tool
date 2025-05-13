import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Board } from 'src/typeORM';
import { UpdateBoardDto } from '../dtos';

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
}
