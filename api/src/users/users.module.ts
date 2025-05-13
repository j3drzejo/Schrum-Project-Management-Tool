import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Team } from 'src/typeORM';
@Module({
  imports: [TypeOrmModule.forFeature([User, Team])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
