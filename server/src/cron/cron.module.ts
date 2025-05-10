import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class } from 'src/classes/classes.model';
import { User } from 'src/users/users.model';

@Module({
  providers: [CronService],
  exports: [],
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forFeature([Class, User]),
  ],
})
export class CronModule {}
