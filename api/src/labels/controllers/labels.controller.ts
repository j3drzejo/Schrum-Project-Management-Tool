import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { LabelsService } from '../services/labels.service';
import { CreateLabelDto, UpdateLabelDto } from '../dtos';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get()
  findAll() {
    return this.labelsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateLabelDto) {
    return this.labelsService.create(dto);
  }

  @Get(':labelId')
  findOne(@Param('labelId') id: string) {
    return this.labelsService.findOne(+id);
  }

  @Put(':labelId')
  update(@Param('labelId') id: string, @Body() dto: UpdateLabelDto) {
    return this.labelsService.update(+id, dto);
  }

  @Delete(':labelId')
  remove(@Param('labelId') id: string) {
    return this.labelsService.remove(+id);
  }

  @Get('tasks/:taskId/labels')
  findForTask(@Param('taskId') id: string) {
    return this.labelsService.findForTask(+id);
  }

  @Post('tasks/:taskId/labels')
  attachToTask(@Param('taskId') id: string, @Body('labelId') labelId: number) {
    return this.labelsService.attachToTask(+id, labelId);
  }

  @Delete('tasks/:taskId/labels/:labelId')
  detachFromTask(@Param('taskId') id: string, @Param('labelId') lid: string) {
    return this.labelsService.detachFromTask(+id, +lid);
  }
}
