import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password too short – must be 8 chars at least.' })
  // at least one letter and one number
  @Matches(/(?=.*[0-9])(?=.*[A-Za-z]).*/, {
    message: 'Password must contain letters and numbers.',
  })
  password: string;
}
