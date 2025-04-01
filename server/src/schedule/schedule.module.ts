import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class } from 'src/classes/classes.model';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports: [SequelizeModule.forFeature([Class])],
})
export class ScheduleModule {}
