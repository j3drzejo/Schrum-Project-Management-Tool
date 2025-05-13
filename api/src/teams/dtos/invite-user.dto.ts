import { IsNotEmpty, IsInt } from 'class-validator';

export class InviteUserDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
