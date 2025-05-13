import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Text content of the comment',
    example: 'Looks great, thanks for sharing!',
    minLength: 1,
  })
  @IsNotEmpty({ message: 'Content must not be empty' })
  @IsString({ message: 'Content must be a string' })
  @MinLength(1, { message: 'Content must be at least 1 character long' })
  content: string;
}
