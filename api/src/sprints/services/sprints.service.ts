import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sprint, Project } from 'src/typeORM';
import { CreateSprintDto, UpdateSprintDto } from '../dtos';

@Injectable()
export class SprintsService {
  constructor(
    @InjectRepository(Sprint) private sprintRepo: Repository<Sprint>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
  ) {}

  async findAll(): Promise<Sprint[]> {
    return this.sprintRepo.find({ relations: ['project', 'board'] });
  }

  async findOne(id: number): Promise<Sprint> {
    const sprint = await this.sprintRepo.findOne({
      where: { id },
      relations: ['project', 'board', 'board.columns'],
    });
    if (!sprint) {
      throw new NotFoundException(`Sprint #${id} not found`);
    }
    return sprint;
  }

  async create(projectId: number, dto: CreateSprintDto): Promise<Sprint> {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }

    const sprint = this.sprintRepo.create({
      name: dto.name,
      startDate: dto.startDate,
      endDate: dto.endDate,
      project,
    });

    return this.sprintRepo.save(sprint);
  }

  async update(id: number, dto: UpdateSprintDto): Promise<Sprint> {
    const sprint = await this.sprintRepo.preload({
      id,
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.startDate !== undefined ? { startDate: dto.startDate } : {}),
      ...(dto.endDate !== undefined ? { endDate: dto.endDate } : {}),
    });

    if (!sprint) {
      throw new NotFoundException(`Sprint #${id} not found`);
    }
    return this.sprintRepo.save(sprint);
  }

  async remove(id: number): Promise<void> {
    const sprint = await this.sprintRepo.findOne({ where: { id } });
    if (!sprint) {
      throw new NotFoundException(`Sprint #${id} not found`);
    }
    await this.sprintRepo.remove(sprint);
  }
}
