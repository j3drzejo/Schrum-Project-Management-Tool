import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'The title of the task',
    example: 'Fix login bug',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the task',
    example: 'Fix the issue with login not working on Safari',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'ID of the board column where the task is located',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  boardColumnId?: number;

  @ApiPropertyOptional({
    description: 'ID of the user assigned to the task',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  assignedUserId?: number;

  @ApiPropertyOptional({
    description: 'ID of the sprint the task belongs to',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  sprintId?: number;
}
