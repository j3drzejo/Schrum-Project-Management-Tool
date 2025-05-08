import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersService } from './users/services/users/users.service';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { SprintsModule } from './sprints/sprints.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { TaskHistoryModule } from './task-history/task-history.module';
import { LabelsModule } from './labels/labels.module';
import { CommentsModule } from './comments/comments.module';
import * as path from 'path';
import entities from './typeORM';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(__dirname, '../db.db'),
      synchronize: true,
      entities,
    }),
    UsersModule,
    TeamsModule,
    SprintsModule,
    ProjectsModule,
    TasksModule,
    BoardsModule,
    TaskHistoryModule,
    LabelsModule,
    CommentsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
