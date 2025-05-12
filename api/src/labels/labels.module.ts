import { Module } from '@nestjs/common';
import { LabelsController } from './controllers/labels.controller';
import { LabelsService } from './services/labels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label, TaskLabel } from 'src/typeORM';
@Module({
  imports: [TypeOrmModule.forFeature([Label, TaskLabel])],
  controllers: [LabelsController],
  providers: [LabelsService],
})
export class LabelsModule {}
