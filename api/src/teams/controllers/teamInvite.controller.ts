import { Controller, Post, Param, Body, Req } from '@nestjs/common';
import { TeamInviteService } from '../services/teamInvite.service';
import { InviteUserDto } from '../dtos/inviteUser.dto';

@Controller('teams/invites')
export class TeamInviteController {
  constructor(private readonly teamInviteService: TeamInviteService) {}

  @Post(':teamId')
  invite(
    @Param('teamId') teamId: string,
    @Body() inviteUserDto: InviteUserDto,
    @Req() req: any,
  ) {
    return this.teamInviteService.inviteUser(
      +teamId,
      inviteUserDto.userId,
      req.user.userId,
    );
  }

  @Post(':inviteId/accept')
  async accept(@Param('inviteId') inviteId: string, @Req() req: any) {
    console.log(req.user.userId);
    return this.teamInviteService.acceptInvite(+inviteId, req.user.userId);
  }
}
