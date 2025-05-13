import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto, UpdateProjectDto } from '../dtos';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('projects')
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('teams/:teamId/projects')
  findByTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.projectsService.findByTeam(teamId);
  }

  @Get('projects/:projectId')
  findOne(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectsService.findOne(projectId);
  }

  @Post('projects')
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Post('teams/:teamId/projects')
  createUnderTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() dto: Omit<CreateProjectDto, 'teamId'>,
  ) {
    return this.projectsService.create({ ...dto, teamId });
  }

  @Put('projects/:projectId')
  update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(projectId, dto);
  }

  @Delete('projects/:projectId')
  remove(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectsService.remove(projectId);
  }
}
