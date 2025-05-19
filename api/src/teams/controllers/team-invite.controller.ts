import {
  Controller,
  Post,
  Param,
  Body,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { TeamInviteService } from '../services/team-invite.service';
import { InviteUserDto } from '../dtos';
import { AuthenticatedRequest } from 'src/types';

@Controller('teams/invites')
export class TeamInviteController {
  constructor(private readonly teamInviteService: TeamInviteService) {}

  @Post(':teamId')
  invite(
    @Param('teamId') teamId: string,
    @Body() inviteUserDto: InviteUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamInviteService.inviteUserByEmail(
      +teamId,
      inviteUserDto.email,
      req.user.userId,
    );
  }

  @Post(':inviteId/accept')
  async accept(
    @Param('inviteId') inviteId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamInviteService.acceptInvite(+inviteId, req.user.userId);
  }

  @Delete(':inviteId/decline')
  async decline(
    @Param('inviteId') inviteId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    await this.teamInviteService.declineInvite(+inviteId, req.user.userId);
    return { status: 'declined' };
  }

  @Get('pending')
  getMine(@Req() req: AuthenticatedRequest) {
    return this.teamInviteService.getPendingInvites(req.user.userId);
  }
}
