import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeamDto {
  @ApiPropertyOptional({
    description: 'Updated name of the team',
    example: 'QA Team',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
