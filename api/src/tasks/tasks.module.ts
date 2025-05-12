import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import {
  Task,
  Project,
  BoardColumn,
  User,
  Sprint,
  TaskHistory,
  TaskLabel,
} from 'src/typeORM';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      Project,
      BoardColumn,
      User,
      Sprint,
      TaskHistory,
      TaskLabel,
    ]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
