import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, Team } from 'src/typeORM';
import { CreateUserDto, UpdateUserDto } from '../dtos';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Team) private teamRepo: Repository<Team>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepo.find({ relations: ['team'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { id },
      relations: ['team'],
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { email, password, name, teamId } = dto;
    const existing = await this.usersRepo.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const user = this.usersRepo.create({ name, email });
    user.password = await bcrypt.hash(password, 12);

    if (teamId !== undefined) {
      const team = await this.teamRepo.findOneBy({ id: teamId });
      if (!team) throw new NotFoundException(`Team #${teamId} not found`);
      user.team = team;
    }

    return this.usersRepo.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepo.preload({ id });
    if (!user) throw new NotFoundException(`User #${id} not found`);

    if (dto.email && dto.email !== user.email) {
      const conflict = await this.usersRepo.findOne({
        where: { email: dto.email },
      });
      if (conflict) throw new BadRequestException('Email already in use');
      user.email = dto.email;
    }
    if (dto.name) user.name = dto.name;
    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 12);
    }
    if (dto.teamId !== undefined) {
      if (dto.teamId === null) {
        user.team = null;
      } else {
        const team = await this.teamRepo.findOneBy({ id: dto.teamId });
        if (!team) throw new NotFoundException(`Team #${dto.teamId} not found`);
        user.team = team;
      }
    }

    return this.usersRepo.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
