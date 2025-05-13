import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional } from 'class-validator';

const STATUSES = [
  'ready',
  'in-progress',
  'in-review',
  'in-testing',
  'ready-for-prod',
] as const;

export class UpdateBoardColumnDto {
  @ApiPropertyOptional({
    description: 'Optional: new status/category for the column',
    enum: STATUSES,
    example: 'in-review',
  })
  @IsOptional()
  @IsIn(STATUSES, { message: `Name must be one of: ${STATUSES.join(', ')}` })
  name?: (typeof STATUSES)[number];

  @ApiPropertyOptional({
    description: 'Optional: new zero-based position index for the column',
    type: 'integer',
    example: 1,
    minimum: 0,
  })
  @IsOptional()
  @IsInt({ message: 'Position must be an integer' })
  position?: number;
}
