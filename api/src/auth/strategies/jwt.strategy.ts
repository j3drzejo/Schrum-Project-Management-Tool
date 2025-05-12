import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from 'src/typeORM';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @InjectRepository(AccessToken) private accessRepo: Repository<AccessToken>,
  ) {
    const secret = config.get<string>('JWT_SECRET');
    if (!secret) throw new Error('Missing JWT_SECRET');
    const opts: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    };
    super(opts);
  }

  async validate(payload: { userId: number; jti: string; email: string }) {
    const token = await this.accessRepo.findOne({
      where: { jti: payload.jti },
      relations: ['user'],
    });

    if (!token || token.expiresAt < new Date()) {
      throw new UnauthorizedException('Token revoked or expired');
    }

    return { userId: token.user.id, email: token.user.email, jti: token.jti };
  }
}
