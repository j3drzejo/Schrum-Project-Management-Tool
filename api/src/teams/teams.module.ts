import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team.controller';
import { TeamInviteController } from './controllers/team-invite.controller';
import { TeamService } from './services/team.service';
import { TeamInviteService } from './services/team-invite.service';
import { Team, User, TeamInvite } from 'src/typeORM';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, TeamInvite])],
  controllers: [TeamController, TeamInviteController],
  providers: [TeamService, TeamInviteService],
})
export class TeamsModule {}
