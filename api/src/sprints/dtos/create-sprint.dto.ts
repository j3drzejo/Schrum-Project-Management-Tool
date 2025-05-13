import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateSprintDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}
