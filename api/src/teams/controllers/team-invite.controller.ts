import { Controller, Post, Param, Body, Req } from '@nestjs/common';
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
    return this.teamInviteService.inviteUser(
      +teamId,
      inviteUserDto.userId,
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
}
