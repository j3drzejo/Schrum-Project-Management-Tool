import { Request, Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  test(@Request() req) {
    return req.user;
  }
}
