import { Module } from '@nestjs/common';
import { TaskHistoryService } from './services/task-history.service';
import { TaskHistoryController } from './controllers/task-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskHistory, Task } from 'src/typeORM';
@Module({
  imports: [TypeOrmModule.forFeature([TaskHistory, Task])],
  providers: [TaskHistoryService],
  controllers: [TaskHistoryController],
})
export class TaskHistoryModule {}
