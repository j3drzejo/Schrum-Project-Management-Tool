import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTeamDto } from '../dtos/createTeam.dto';
import { UpdateTeamDto } from '../dtos/updateTeam.dto';
import { Team, User } from 'src/typeORM';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepo: Repository<Team>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<Team[]> {
    return this.teamRepo.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepo.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!team) {
      throw new NotFoundException(`Team #${id} not found`);
    }
    return team;
  }

  async create(createTeamDto: CreateTeamDto, userId: number): Promise<Team> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const team = this.teamRepo.create({ name: createTeamDto.name });
    team.users = [user];
    return this.teamRepo.save(team);
  }

  async update(
    id: number,
    updateTeamDto: UpdateTeamDto,
    userId: number,
  ): Promise<Team> {
    const checkIfUserInTeam = await this.teamRepo.findOne({
      where: {
        id: id,
        users: { id: userId },
      },
      relations: ['users'],
    });

    if (!checkIfUserInTeam) {
      throw new NotFoundException('User not found in the team');
    }

    const team = await this.teamRepo.preload({ id, ...updateTeamDto });
    if (!team) {
      throw new NotFoundException(`Team #${id} not found`);
    }
    return this.teamRepo.save(team);
  }

  async remove(id: number, userId: number): Promise<void> {
    const checkIfUserInTeam = await this.teamRepo.findOne({
      where: {
        id: id,
        users: { id: userId },
      },
      relations: ['users'],
    });

    if (!checkIfUserInTeam) {
      throw new NotFoundException('User not found in the team');
    }

    const team = await this.teamRepo.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team #${id} not found`);
    }
    await this.teamRepo.remove(team);
  }
}
