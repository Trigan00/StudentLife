import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comments.model';
import { FileAttachment } from './entities/file-attachment.model.ts';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [SequelizeModule.forFeature([Comment, FileAttachment])],
})
export class CommentsModule {}
