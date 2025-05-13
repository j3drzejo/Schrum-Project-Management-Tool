import { IsInt, IsOptional, IsString } from 'class-validator';

export class MoveTaskDto {
  @IsInt()
  columnId: number;

  @IsOptional()
  @IsString()
  note?: string;
}
