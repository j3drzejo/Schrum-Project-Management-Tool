import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

const STATUSES = [
  'ready',
  'in-progress',
  'in-review',
  'in-testing',
  'ready-for-prod',
] as const;

export class CreateBoardColumnDto {
  @IsNotEmpty()
  @IsIn(STATUSES)
  name: (typeof STATUSES)[number];

  @IsInt()
  position: number;
}
