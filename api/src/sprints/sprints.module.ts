import { Module } from '@nestjs/common';
import { SprintsService } from './services/sprints.service';
import { SprintsController } from './controllers/sprints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint, Project } from 'src/typeORM';
@Module({
  imports: [TypeOrmModule.forFeature([Sprint, Project])],
  providers: [SprintsService],
  controllers: [SprintsController],
})
export class SprintsModule {}
