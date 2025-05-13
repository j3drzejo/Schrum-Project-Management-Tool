import {
  IsOptional,
  IsString,
  MinLength,
  IsEmail,
  IsInt,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Updated full name of the user',
    example: 'Jane Smith',
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated email address of the user',
    example: 'jane.smith@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Updated password (min 6 characters)',
    example: 'newSecurePass456',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    description: 'Updated team ID the user belongs to',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  teamId?: number;
}
