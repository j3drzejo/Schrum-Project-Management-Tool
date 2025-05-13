import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskHistory, Task } from 'src/typeORM';

@Injectable()
export class TaskHistoryService {
  constructor(
    @InjectRepository(TaskHistory)
    private readonly historyRepo: Repository<TaskHistory>,
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async findForTask(taskId: number): Promise<TaskHistory[]> {
    const task = await this.taskRepo.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException(`Task #${taskId} not found`);
    }

    return this.historyRepo.find({
      where: { task: { id: taskId } },
      relations: ['user', 'fromColumn', 'toColumn'],
      order: { timestamp: 'ASC' },
    });
  }
}
