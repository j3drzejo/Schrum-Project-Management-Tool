import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignTaskDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
