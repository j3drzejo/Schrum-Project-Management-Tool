import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiPropertyOptional({
    description: 'Updated text content of the comment',
    example: 'Updated comment text',
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Content must be at least 1 character long' })
  content?: string;
}
