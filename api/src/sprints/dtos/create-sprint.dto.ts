import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateSprintDto {
  @ApiProperty({
    description: 'Name of the sprint',
    example: 'Sprint 1',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'ISO 8601 date string for when the sprint starts',
    example: '2025-06-01',
    format: 'date',
  })
  @IsNotEmpty({ message: 'startDate must not be empty' })
  @IsDateString(
    {},
    { message: 'startDate must be a valid ISO 8601 date string' },
  )
  startDate: string;

  @ApiProperty({
    description: 'ISO 8601 date string for when the sprint ends',
    example: '2025-06-15',
    format: 'date',
  })
  @IsNotEmpty({ message: 'endDate must not be empty' })
  @IsDateString({}, { message: 'endDate must be a valid ISO 8601 date string' })
  endDate: string;
}
