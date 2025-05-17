import { Module } from '@nestjs/common';
import { ExamQandAService } from './exam-qand-a.service';
import { ExamQandAController } from './exam-qand-a.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileAttachment } from 'src/comments/entities/file-attachment.model.ts';
import { ExamQandA } from './examQandA.model';

@Module({
  controllers: [ExamQandAController],
  providers: [ExamQandAService],
  imports: [SequelizeModule.forFeature([ExamQandA, FileAttachment])],
})
export class ExamQandAModule {}
