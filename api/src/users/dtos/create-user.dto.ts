import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account (min 6 characters)',
    example: 'securePass123',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description: 'Optional team ID the user belongs to',
    example: 3,
  })
  @IsOptional()
  @IsInt()
  teamId?: number;
}
