import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, Team } from 'src/typeORM';
@Module({
  imports: [TypeOrmModule.forFeature([Team, Project])],

  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
