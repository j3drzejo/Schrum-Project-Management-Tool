import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InviteUserDto {
  @ApiProperty({
    description: 'ID of the user to invite',
    example: 42,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
