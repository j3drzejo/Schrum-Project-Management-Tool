import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { SprintsService } from '../services/sprints.service';
import { CreateSprintDto, UpdateSprintDto } from '../dtos';

@Controller()
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Get('sprints')
  findAll() {
    return this.sprintsService.findAll();
  }

  @Post('projects/:projectId/sprints')
  create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateSprintDto,
  ) {
    return this.sprintsService.create(projectId, dto);
  }

  @Get('sprints/:sprintId')
  findOne(@Param('sprintId', ParseIntPipe) sprintId: number) {
    return this.sprintsService.findOne(sprintId);
  }

  @Put('sprints/:sprintId')
  update(
    @Param('sprintId', ParseIntPipe) sprintId: number,
    @Body() dto: UpdateSprintDto,
  ) {
    return this.sprintsService.update(sprintId, dto);
  }

  @Delete('sprints/:sprintId')
  remove(@Param('sprintId', ParseIntPipe) sprintId: number) {
    return this.sprintsService.remove(sprintId);
  }

  @Get('projects/:projectId/sprints/current')
  getCurrentSprint(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.sprintsService.getCurrentSprint(projectId);
  }
}
