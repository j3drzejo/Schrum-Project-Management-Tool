import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
  AssignUserDto,
  MoveTaskDto,
} from '../dtos';
import { AuthenticatedRequest } from 'src/types';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('tasks')
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('tasks/:taskId')
  findOne(@Param('taskId') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Post('projects/:projectId/tasks')
  create(
    @Param('projectId') projectId: string,
    @Body() dto: CreateTaskDto,
    @Req() req: AuthenticatedRequest,
  ) {
    dto.projectId = +projectId;
    return this.tasksService.create(dto, req.user.userId);
  }

  @Put('tasks/:taskId')
  update(@Param('taskId') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(+id, dto);
  }

  @Delete('tasks/:taskId')
  remove(@Param('taskId') id: string) {
    return this.tasksService.remove(+id);
  }

  @Get('projects/:projectId/tasks')
  findForProject(@Param('projectId') projectId: string) {
    return this.tasksService.findForProject(+projectId);
  }

  @Get('sprints/:sprintId/tasks')
  findForSprint(@Param('sprintId') sprintId: string) {
    return this.tasksService.findForSprint(+sprintId);
  }

  @Patch('tasks/:taskId/assign')
  assign(@Param('taskId') id: string, @Body() dto: AssignUserDto) {
    return this.tasksService.assign(+id, dto);
  }

  @Patch('tasks/:taskId/move')
  move(
    @Param('taskId') id: string,
    @Body() dto: MoveTaskDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.tasksService.move(+id, dto, req.user.userId);
  }

  @Get('tasks/:taskId/history')
  history(@Param('taskId') id: string) {
    return this.tasksService.history(+id);
  }

  // --- Label linking endpoints ---
  @Get('tasks/:taskId/labels') findLabels(@Param('taskId') id: string) {
    return this.tasksService.findLabels(+id);
  }

  @Post('tasks/:taskId/labels') attachLabel(
    @Param('taskId') id: string,
    @Body('labelId') labelId: number,
  ) {
    return this.tasksService.attachLabel(+id, labelId);
  }

  @Delete('tasks/:taskId/labels/:labelId') detachLabel(
    @Param('taskId') id: string,
    @Param('labelId') lid: string,
  ) {
    return this.tasksService.detachLabel(+id, +lid);
  }
}
