import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from '../services/boards.service';
import { UpdateBoardDto } from '../dtos';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
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
