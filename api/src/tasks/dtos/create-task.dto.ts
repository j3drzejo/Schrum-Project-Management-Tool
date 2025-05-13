import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  projectId: number;

  @IsOptional()
  @IsInt()
  sprintId?: number;

  @IsInt()
  boardColumnId: number;

  @IsOptional()
  @IsInt()
  assignedUserId?: number;
}
