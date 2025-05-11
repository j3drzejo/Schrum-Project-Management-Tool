import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './public.decorator';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.jti);
    return { message: 'Logged out successfully' };
  }

  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
