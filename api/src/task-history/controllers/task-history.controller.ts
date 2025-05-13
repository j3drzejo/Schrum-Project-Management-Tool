import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TaskHistoryService } from '../services/task-history.service';
import { TaskHistory } from 'src/typeORM';

@Controller('tasks/:taskId/history')
export class TaskHistoryController {
  constructor(private readonly historyService: TaskHistoryService) {}

  @Get()
  async findAll(
    @Param('taskId', ParseIntPipe) taskId: number,
  ): Promise<TaskHistory[]> {
    return this.historyService.findForTask(taskId);
  }
}
