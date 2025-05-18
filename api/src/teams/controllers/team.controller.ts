import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { TeamInviteService } from '../services/team-invite.service';
import { CreateTeamDto, UpdateTeamDto } from '../dtos';
import { AuthenticatedRequest } from 'src/types';

@Controller('teams')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly teamInviteService: TeamInviteService,
  ) {}

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    return this.teamService.findUserTeams(req.user.userId);
  }

  @Get('all')
  async findAllTeams() {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createTeamDto: CreateTeamDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamService.create(createTeamDto, req.user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamService.update(+id, updateTeamDto, req.user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    await this.teamService.remove(+id, req.user.userId);
    return { deleted: true };
  }
}
