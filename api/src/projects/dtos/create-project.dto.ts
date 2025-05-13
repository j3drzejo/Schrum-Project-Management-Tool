import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  description?: string;

  @IsNotEmpty()
  @IsInt()
  teamId: number;
}
