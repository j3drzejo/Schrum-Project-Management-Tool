import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, AccessToken } from 'src/typeORM';
import { RegisterDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(AccessToken) private accessRepo: Repository<AccessToken>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ message: string }> {
    if (!dto) {
      throw new BadRequestException('No registration data provided.');
    }

    const { name, email, password } = dto;

    if (!name || !email || !password) {
      throw new BadRequestException('Name, email, and password are required.');
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await this.userRepository.findOne({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = this.userRepository.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return { message: 'User registered successfully' };
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const jti = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 3600 * 1000);

    const tokenEntity = this.accessRepo.create({ jti, user, expiresAt });
    await this.accessRepo.save(tokenEntity);

    const payload = { sub: user.id, email: user.email, jti };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
  async logout(jti: string): Promise<void> {
    await this.accessRepo.delete({ jti });
  }
}
