import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AssignUserDto {
  @ApiProperty({
    description: 'The ID of the user to assign',
    example: 123,
    type: 'integer',
    minimum: 1,
  })
  @IsInt({ message: 'userId must be an integer' })
  userId: number;
}
