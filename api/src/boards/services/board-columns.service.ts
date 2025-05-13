import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BoardColumn, Board } from 'src/typeORM';
import { CreateBoardColumnDto, UpdateBoardColumnDto } from '../dtos';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private colRepo: Repository<BoardColumn>,
    @InjectRepository(Board)
    private boardRepo: Repository<Board>,
  ) {}

  async list(boardId: number): Promise<BoardColumn[]> {
    await this.boardRepo.findOneOrFail({ where: { id: boardId } });
    return this.colRepo.find({ where: { board: { id: boardId } } });
  }

  async create(
    boardId: number,
    dto: CreateBoardColumnDto,
  ): Promise<BoardColumn> {
    const board = await this.boardRepo.findOne({ where: { id: boardId } });
    if (!board) {
      throw new NotFoundException(`Board #${boardId} not found`);
    }
    const col = this.colRepo.create({ ...dto, board });
    return this.colRepo.save(col);
  }

  async getOne(columnId: number): Promise<BoardColumn> {
    const col = await this.colRepo.findOne({
      where: { id: columnId },
      relations: ['board'],
    });
    if (!col) {
      throw new NotFoundException(`Column #${columnId} not found`);
    }
    return col;
  }

  async update(
    columnId: number,
    dto: UpdateBoardColumnDto,
  ): Promise<BoardColumn> {
    const col = await this.colRepo.preload({ id: columnId, ...dto });
    if (!col) {
      throw new NotFoundException(`Column #${columnId} not found`);
    }
    return this.colRepo.save(col);
  }

  async remove(columnId: number): Promise<void> {
    const col = await this.colRepo.findOne({ where: { id: columnId } });
    if (!col) {
      throw new NotFoundException(`Column #${columnId} not found`);
    }
    await this.colRepo.remove(col);
  }
}
