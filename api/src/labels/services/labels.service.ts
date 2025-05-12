import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label, TaskLabel } from 'src/typeORM';
import { CreateLabelDto, UpdateLabelDto } from '../dtos';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label) private readonly labelRepo: Repository<Label>,
    @InjectRepository(TaskLabel)
    private readonly linkRepo: Repository<TaskLabel>,
  ) {}

  findAll(): Promise<Label[]> {
    return this.labelRepo.find();
  }

  async findOne(id: number): Promise<Label> {
    const label = await this.labelRepo.findOne({ where: { id } });
    if (!label) throw new NotFoundException(`Label #${id} not found`);
    return label;
  }

  create(dto: CreateLabelDto): Promise<Label> {
    const label = this.labelRepo.create(dto);
    return this.labelRepo.save(label);
  }

  async update(id: number, dto: UpdateLabelDto): Promise<Label> {
    const label = await this.labelRepo.preload({ id, ...dto });
    if (!label) throw new NotFoundException(`Label #${id} not found`);
    return this.labelRepo.save(label);
  }

  async remove(id: number): Promise<void> {
    const label = await this.findOne(id);
    await this.labelRepo.remove(label);
  }

  async findForTask(taskId: number): Promise<TaskLabel[]> {
    return this.linkRepo.find({ where: { taskId }, relations: ['label'] });
  }

  async attachToTask(taskId: number, labelId: number): Promise<TaskLabel> {
    const link = this.linkRepo.create({ taskId, labelId });
    return this.linkRepo.save(link);
  }

  async detachFromTask(taskId: number, labelId: number): Promise<void> {
    const link = await this.linkRepo.findOne({ where: { taskId, labelId } });
    if (!link)
      throw new NotFoundException(
        `Label #${labelId} not linked to Task #${taskId}`,
      );
    await this.linkRepo.remove(link);
  }
}
