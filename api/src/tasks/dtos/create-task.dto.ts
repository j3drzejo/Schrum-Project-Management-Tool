import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Implement authentication flow',
    minLength: 1,
    maxLength: 200,
  })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the task',
    example: 'Build login, logout, and refresh-token endpoints using JWT',
    minLength: 1,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'ID of the project this task belongs to',
    example: 10,
    type: 'integer',
    minimum: 1,
  })
  @IsInt({ message: 'projectId must be an integer' })
  projectId: number;

  @ApiPropertyOptional({
    description: 'Optional: ID of the sprint this task is assigned to',
    example: 3,
    type: 'integer',
    minimum: 1,
  })
  @IsOptional()
  @IsInt({ message: 'sprintId must be an integer' })
  sprintId?: number;

  @ApiProperty({
    description: 'ID of the board column where this task should appear',
    example: 2,
    type: 'integer',
    minimum: 0,
  })
  @IsInt({ message: 'boardColumnId must be an integer' })
  boardColumnId: number;

  @ApiPropertyOptional({
    description: 'Optional: ID of the user assigned to this task',
    example: 42,
    type: 'integer',
    minimum: 1,
  })
  @IsOptional()
  @IsInt({ message: 'assignedUserId must be an integer' })
  assignedUserId?: number;
}
