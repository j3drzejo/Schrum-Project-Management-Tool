import { Request, Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/types';

@Controller('users')
export class UsersController {
  @Get()
  test(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
