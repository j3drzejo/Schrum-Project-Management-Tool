import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({
    description: 'The name of the team',
    example: 'Development Team',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
