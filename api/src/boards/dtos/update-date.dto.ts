import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
  @ApiPropertyOptional({
    description: 'Optional: new name for the board',
    example: 'Sprint Planning Board',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;
}
