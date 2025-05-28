import { Controller, Get } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/types';
@Controller('admin')
export class AdminController {
  @Get('/')
  isAdmin(@Req() req: AuthenticatedRequest) {
    return req.user.isAdmin;
  }
}
