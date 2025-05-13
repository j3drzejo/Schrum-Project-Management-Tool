import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

const STATUSES = [
  'ready',
  'in-progress',
  'in-review',
  'in-testing',
  'ready-for-prod',
] as const;

export class CreateBoardColumnDto {
  @ApiProperty({
    description: 'The status/category for the new board column',
    enum: STATUSES,
    example: 'in-progress',
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsIn(STATUSES, { message: `Name must be one of: ${STATUSES.join(', ')}` })
  name: (typeof STATUSES)[number];

  @ApiProperty({
    description:
      'Zero-based position index where the column should be inserted',
    type: 'integer',
    example: 2,
    minimum: 0,
  })
  @IsInt({ message: 'Position must be an integer' })
  position: number;
}
