import { IsIn, IsInt, IsOptional } from 'class-validator';

const STATUSES = [
  'ready',
  'in-progress',
  'in-review',
  'in-testing',
  'ready-for-prod',
] as const;

export class UpdateBoardColumnDto {
  @IsOptional()
  @IsIn(STATUSES)
  name?: (typeof STATUSES)[number];

  @IsOptional()
  @IsInt()
  position?: number;
}
