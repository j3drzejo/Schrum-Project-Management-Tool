import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team, User, TeamInvite } from 'src/typeORM';

@Injectable()
export class TeamInviteService {
  constructor(
    @InjectRepository(TeamInvite) private inviteRepo: Repository<TeamInvite>,
    @InjectRepository(Team) private teamRepo: Repository<Team>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async inviteUser(
    teamId: number,
    invitedUserId: number,
    inviterId: number,
  ): Promise<TeamInvite> {
    const team = await this.teamRepo.findOne({
      where: { id: teamId },
      relations: ['users'],
    });
    if (!team) {
      throw new NotFoundException(`Team #${teamId} not found`);
    }

    const invitedUser = await this.userRepo.findOne({
      where: { id: invitedUserId },
    });
    if (!invitedUser) {
      throw new NotFoundException(`User #${invitedUserId} not found`);
    }

    if (team.users.some((user) => user.id === invitedUserId)) {
      throw new BadRequestException('User is already a member of this team');
    }

    const inviter = await this.userRepo.findOne({
      where: { id: inviterId },
      relations: ['team'],
    });
    if (!inviter || inviter.team?.id !== team.id) {
      throw new ForbiddenException('Only team members can invite others');
    }

    const existingInvite = await this.inviteRepo.findOne({
      where: {
        team: { id: teamId },
        invitedUser: { id: invitedUserId },
        accepted: false,
      },
    });
    if (existingInvite) {
      throw new BadRequestException('Invite already exists');
    }

    const invite = this.inviteRepo.create({
      team,
      invitedUser,
      invitedBy: inviter,
      accepted: false,
    });

    return this.inviteRepo.save(invite);
  }

  async acceptInvite(inviteId: number, userId: number): Promise<TeamInvite> {
    const invite = await this.inviteRepo.findOne({
      where: { id: inviteId },
      relations: ['team', 'invitedUser', 'team.users'],
    });
    if (!invite) {
      throw new NotFoundException(`Invite #${inviteId} not found`);
    }
    if (invite.invitedUser.id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to accept this invite',
      );
    }
    if (invite.accepted) {
      throw new BadRequestException('Invite already accepted');
    }

    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['team'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.team) {
      throw new BadRequestException('User already belongs to a team');
    }

    user.team = invite.team;
    invite.accepted = true;

    await this.userRepo.save(user);
    return this.inviteRepo.save(invite);
  }
}
