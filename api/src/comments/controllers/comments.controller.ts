import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';
import { AuthenticatedRequest } from 'src/types';
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('tasks/:taskId/comments')
  list(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.commentsService.list(taskId);
  }

  @Post('tasks/:taskId/comments')
  create(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(taskId, req.user.userId, dto);
  }

  @Get('comments/:commentId')
  findOne(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.findOne(commentId);
  }

  @Put('comments/:commentId')
  update(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentsService.update(commentId, req.user.userId, dto);
  }

  @Delete('comments/:commentId')
  remove(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.commentsService.remove(commentId, req.user.userId);
  }
}
