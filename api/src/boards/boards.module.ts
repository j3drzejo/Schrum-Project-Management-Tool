import { Module } from '@nestjs/common';
import { BoardsService } from './services/boards.service';
import { BoardsController } from './controllers/boards.controller';
import { BoardColumnsService } from './services/board-columns.service';
import { BoardColumnsController } from './controllers/board-columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board, BoardColumn, Sprint } from 'src/typeORM';
@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardColumn, Sprint])],
  providers: [BoardsService, BoardColumnsService],
  controllers: [BoardsController, BoardColumnsController],
})
export class BoardsModule {}
