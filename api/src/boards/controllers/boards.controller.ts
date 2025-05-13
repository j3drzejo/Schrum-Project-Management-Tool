import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from '../services/boards.service';
import { UpdateBoardDto } from '../dtos';

@Controller()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('sprints/:sprintId/board')
  getBySprint(@Param('sprintId', ParseIntPipe) sprintId: number) {
    return this.boardsService.getBySprint(sprintId);
  }

  @Put('boards/:boardId')
  update(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() dto: UpdateBoardDto,
  ) {
    return this.boardsService.update(boardId, dto);
  }
}
