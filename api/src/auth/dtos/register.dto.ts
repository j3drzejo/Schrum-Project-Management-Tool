import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Jane Doe',
    minLength: 2,
  })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @ApiProperty({
    description: 'Email address for login and communication',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Password with at least one letter and one number',
    example: 'strongPassword123!',
    format: 'password',
    minLength: 8,
    pattern: '(?=.*[0-9])(?=.*[A-Za-z]).*',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password too short – must be 8 chars at least.' })
  @Matches(/(?=.*[0-9])(?=.*[A-Za-z]).*/, {
    message: 'Password must contain letters and numbers.',
  })
  password: string;
}
