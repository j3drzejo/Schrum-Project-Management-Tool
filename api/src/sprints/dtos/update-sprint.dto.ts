import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateSprintDto {
  @ApiPropertyOptional({
    description: 'Optional: new name for the sprint',
    example: 'Sprint Alpha',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Optional: new start date of the sprint (ISO 8601)',
    example: '2025-07-01',
    format: 'date',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'startDate must be a valid ISO 8601 date string' },
  )
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Optional: new end date of the sprint (ISO 8601)',
    example: '2025-07-15',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'endDate must be a valid ISO 8601 date string' })
  endDate?: string;
}
