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

  async inviteUserByEmail(
    teamId: number,
    invitedUserEmail: string,
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
      where: { email: invitedUserEmail },
    });
    if (!invitedUser) {
      throw new NotFoundException(
        `User with email ${invitedUserEmail} not found`,
      );
    }

    if (team.users.some((user) => user.id === invitedUser.id)) {
      throw new BadRequestException('User is already a member of this team');
    }

    const inviter = await this.userRepo.findOne({
      where: { id: inviterId },
      relations: ['teams'],
    });

    const isInviterInTeam = inviter?.teams?.some(
      (userTeam) => userTeam.id === team.id,
    );
    if (!inviter || !isInviterInTeam) {
      throw new ForbiddenException('Only team members can invite others');
    }

    const existingInvite = await this.inviteRepo.findOne({
      where: {
        team: { id: teamId },
        invitedUser: { id: invitedUser.id },
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
      relations: ['teams'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.teams.some((team) => team.id === invite.team.id)) {
      throw new BadRequestException('User is already a member of this team');
    }

    user.teams.push(invite.team);
    invite.accepted = true;

    await this.userRepo.save(user);
    return this.inviteRepo.save(invite);
  }

  async getPendingInvites(userId: number): Promise<TeamInvite[]> {
    return this.inviteRepo.find({
      where: { invitedUser: { id: userId }, accepted: false },
      relations: ['team', 'invitedBy'],
    });
  }

  async declineInvite(inviteId: number, userId: number): Promise<void> {
    const invite = await this.inviteRepo.findOne({
      where: { id: inviteId },
      relations: ['invitedUser'],
    });
    if (!invite) {
      throw new NotFoundException(`Invite #${inviteId} not found`);
    }
    if (invite.invitedUser.id !== userId) {
      throw new ForbiddenException('Not authorized to decline this invite');
    }
    if (invite.accepted) {
      throw new BadRequestException('Cannot decline an accepted invite');
    }

    await this.inviteRepo.delete(inviteId);
  }
}
