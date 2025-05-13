import { IsString, IsHexColor } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  name: string;

  @IsHexColor()
  color: string;
}
