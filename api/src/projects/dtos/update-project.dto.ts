import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    description: 'Optional: new name for the project',
    example: 'Mobile App Overhaul',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Optional: new brief description of the project',
    example: 'Update UI/UX to Material Design standards',
    minLength: 3,
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(3, { message: 'Description must be at least 3 characters' })
  description?: string;
}
