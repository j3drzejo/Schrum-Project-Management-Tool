import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTaskDto,
  UpdateTaskDto,
  AssignUserDto,
  MoveTaskDto,
} from '../dtos';
import { User, BoardColumn, TaskHistory, Task } from 'src/typeORM';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
    @InjectRepository(TaskHistory)
    private readonly historyRepo: Repository<TaskHistory>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(BoardColumn)
    private readonly columnRepo: Repository<BoardColumn>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepo.find({
      relations: ['project', 'sprint', 'boardColumn', 'assignedUser'],
    });
  }

  async findForProject(projectId: number): Promise<Task[]> {
    return this.taskRepo.find({
      where: { project: { id: projectId } },
      relations: ['boardColumn', 'assignedUser'],
    });
  }

  async findForSprint(sprintId: number): Promise<Task[]> {
    return this.taskRepo.find({
      where: { sprint: { id: sprintId } },
      relations: ['boardColumn', 'assignedUser'],
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: [
        'project',
        'sprint',
        'boardColumn',
        'assignedUser',
        'history',
      ],
    });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }

  async create(dto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.taskRepo.create({
      title: dto.title,
      description: dto.description,
      project: { id: dto.projectId },
      sprint: dto.sprintId ? { id: dto.sprintId } : undefined,
      boardColumn: { id: dto.boardColumnId },
      assignedUser: dto.assignedUserId ? { id: dto.assignedUserId } : undefined,
      createdBy: { id: userId },
    });
    return await this.taskRepo.save(task);
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepo.preload({ id, ...dto });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return await this.taskRepo.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    await this.taskRepo.remove(task);
  }

  async assign(id: number, dto: AssignUserDto): Promise<Task> {
    const task = await this.findOne(id);
    if (dto.userId !== undefined) {
      const user = await this.userRepo.findOne({ where: { id: dto.userId } });
      if (!user) {
        throw new NotFoundException(`User #${dto.userId} not found`);
      }
      task.assignedUser = user;
    } else {
      task.assignedUser = undefined;
    }
    return await this.taskRepo.save(task);
  }

  async move(id: number, dto: MoveTaskDto, userId: number): Promise<Task> {
    const task = await this.findOne(id);
    const toColumn = await this.columnRepo.findOne({
      where: { id: dto.columnId },
    });
    if (!toColumn) {
      throw new NotFoundException(`Column #${dto.columnId} not found`);
    }
    const fromColumn = task.boardColumn;
    task.boardColumn = toColumn;

    await this.historyRepo.save({
      task: { id },
      user: { id: userId },
      fromColumn: { id: fromColumn.id },
      toColumn: { id: toColumn.id },
      note: dto.note,
    });

    return await this.taskRepo.save(task);
  }

  async history(taskId: number): Promise<TaskHistory[]> {
    return this.historyRepo.find({
      where: { task: { id: taskId } },
      relations: ['user', 'fromColumn', 'toColumn'],
      order: { timestamp: 'ASC' },
    });
  }

  async findLabels(taskId: number) {
    const task = await this.findOne(taskId);
    return task.labels;
  }

  async attachLabel(taskId: number, labelId: number) {
    const link = this.historyRepo.manager
      .getRepository('TaskLabel')
      .create({ taskId, labelId });
    return this.historyRepo.manager.getRepository('TaskLabel').save(link);
  }

  async detachLabel(taskId: number, labelId: number) {
    const repo = this.historyRepo.manager.getRepository('TaskLabel');
    const link = await repo.findOne({ where: { taskId, labelId } });
    if (!link)
      throw new NotFoundException(
        `Label #${labelId} not attached to Task #${taskId}`,
      );
    await repo.remove(link);
  }
}
