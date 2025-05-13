import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, Team } from 'src/typeORM';
import { CreateProjectDto, UpdateProjectDto } from '../dtos';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Team) private teamRepo: Repository<Team>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({ relations: ['team'] });
  }

  async findByTeam(teamId: number): Promise<Project[]> {
    const team = await this.teamRepo.findOneBy({ id: teamId });
    if (!team) throw new NotFoundException(`Team #${teamId} not found`);
    return this.projectRepo.find({
      where: { team: { id: teamId } },
      relations: ['team'],
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['team', 'sprints', 'tasks'],
    });
    if (!project) throw new NotFoundException(`Project #${id} not found`);
    return project;
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const { name, description, teamId } = dto;
    const team = await this.teamRepo.findOneBy({ id: teamId });
    if (!team) throw new NotFoundException(`Team #${teamId} not found`);

    const exists = await this.projectRepo.findOne({
      where: { name, team: { id: teamId } },
    });
    if (exists) {
      throw new ConflictException(
        `Project named "${name}" already exists in this team`,
      );
    }

    const project = this.projectRepo.create({ name, description, team });
    return this.projectRepo.save(project);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepo.preload({ id, ...dto });
    if (!project) throw new NotFoundException(`Project #${id} not found`);
    return this.projectRepo.save(project);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project #${id} not found`);
    }
  }
}
