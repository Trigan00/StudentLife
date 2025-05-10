import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.model';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ClassesModule } from './classes/classes.module';
import { Class } from './classes/classes.model';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/tasks.model';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comments.model';
import { FileAttachment } from './comments/entities/file-attachment.model.ts';
import { ScheduleModule } from './schedule/schedule.module';
import { UserTasks } from './tasks/entities/user-tasks.model';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      logging: false,
      define: {
        timestamps: false,
      },
      models: [User, Token, Class, Task, Comment, FileAttachment, UserTasks],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),

    // ThrottlerModule.forRoot({
    //   ttl: 60000,
    //   limit: 50,
    // }),

    UsersModule,
    AuthModule,
    // PasswordsModule,
    // MailModule,
    TokenModule,
    ClassesModule,
    TasksModule,
    CommentsModule,
    ScheduleModule,
    CronModule,
  ],
  controllers: [],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: ThrottlerGuard,
  //   },
  // ],
})
export class AppModule {}
