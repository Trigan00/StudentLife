import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class } from './classes.model';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  imports: [SequelizeModule.forFeature([Class])],
})
export class ClassesModule {}
