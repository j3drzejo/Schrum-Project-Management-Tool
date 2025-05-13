import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardColumnsService } from '../services/board-columns.service';
import { UpdateBoardColumnDto, CreateBoardColumnDto } from '../dtos';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller()
export class BoardColumnsController {
  constructor(private readonly colsService: BoardColumnsService) {}

  @Get('boards/:boardId/columns')
  list(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.colsService.list(boardId);
  }

  @Post('boards/:boardId/columns')
  create(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() dto: CreateBoardColumnDto,
  ) {
    return this.colsService.create(boardId, dto);
  }

  @Get('columns/:columnId')
  getOne(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.colsService.getOne(columnId);
  }

  @Put('columns/:columnId')
  update(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() dto: UpdateBoardColumnDto,
  ) {
    return this.colsService.update(columnId, dto);
  }

  @Delete('columns/:columnId')
  remove(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.colsService.remove(columnId);
  }
}
