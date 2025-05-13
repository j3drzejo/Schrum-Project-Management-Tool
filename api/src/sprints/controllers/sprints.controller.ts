import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { SprintsService } from '../services/sprints.service';
import { CreateSprintDto, UpdateSprintDto } from '../dtos';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
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
}
