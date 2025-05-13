import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class MoveTaskDto {
  @ApiProperty({
    description: 'ID of the column to which the task should be moved',
    example: 4,
    type: 'integer',
    minimum: 0,
  })
  @IsInt({ message: 'columnId must be an integer' })
  columnId: number;

  @ApiPropertyOptional({
    description: 'Optional: note explaining the reason or context for the move',
    example: 'Moving to in-review after QA complete',
    minLength: 1,
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'note must be a string' })
  note?: string;
}
