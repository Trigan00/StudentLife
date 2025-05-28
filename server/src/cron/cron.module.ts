import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class } from 'src/classes/classes.model';
import { User } from 'src/users/users.model';
import { Task } from 'src/tasks/entities/tasks.model';
import { MailModule } from 'src/mail/mail.module';

@Module({
  providers: [CronService],
  exports: [],
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forFeature([Class, User, Task]),
    MailModule,
  ],
})
export class CronModule {}
