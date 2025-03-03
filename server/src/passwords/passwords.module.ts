import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { PasswordsController } from './passwords.controller';
import { Password } from './passwords.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [PasswordsController],
  providers: [PasswordsService],
  imports: [SequelizeModule.forFeature([Password])],
})
export class PasswordsModule {}
