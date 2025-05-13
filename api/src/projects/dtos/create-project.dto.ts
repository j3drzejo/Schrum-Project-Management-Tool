import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'Website Redesign',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @ApiPropertyOptional({
    description: 'A short description of the project',
    example: 'Revamp company website with new branding',
    minLength: 3,
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(3, { message: 'Description must be at least 3 characters' })
  description?: string;

  @ApiProperty({
    description: 'The ID of the team that owns this project',
    example: 42,
    type: 'integer',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'teamId must not be empty' })
  @IsInt({ message: 'teamId must be an integer' })
  teamId: number;
}
