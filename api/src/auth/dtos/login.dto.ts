import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'The user’s password',
    example: 'strongPassword123!',
    format: 'password',
    minLength: 8,
  })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
