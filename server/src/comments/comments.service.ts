import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comments.model';
import { FileAttachment } from './entities/file-attachment.model.ts';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private CommentRepo: typeof Comment,
    @InjectModel(FileAttachment)
    private FileAttachmentRepo: typeof FileAttachment,
  ) {}

  async create(
    userId: number,
    username: string,
    createCommentDto: CreateCommentDto,
    files: Express.Multer.File[],
  ) {
    const candidate = await this.CommentRepo.findOne({
      where: {
        text: createCommentDto.text,
        userId,
        taskId: Number(createCommentDto.taskId),
      },
    });
    if (candidate)
      throw new HttpException(
        'Такой комментарий уже существует',
        HttpStatus.BAD_REQUEST,
      );

    const comment = await this.CommentRepo.create({
      ...createCommentDto,
      userId,
      username,
    });

    if (files?.length) {
      const attachments = files.map((file) => ({
        filename: file.originalname,
        path: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        commentId: comment.id,
      }));

      await this.FileAttachmentRepo.bulkCreate(attachments);
    }

    return { message: 'Комментарий добавлен' };
  }

  async findAll(taskId: number) {
    const commentsArr = await this.CommentRepo.findAll({
      where: {
        taskId,
      },
      order: [['createdAt', 'ASC']],
      include: [{ model: FileAttachment }],
    });

    return commentsArr;
  }

  async findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    const comment = await this.CommentRepo.findOne({
      where: { id },
      include: [{ model: FileAttachment }],
    });

    if (!comment) {
      throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND);
    }

    if (comment.attachments.length) {
      for (const attachment of comment.attachments) {
        const filePath = path.join(__dirname, '../../uploads', attachment.path);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await this.FileAttachmentRepo.destroy({
        where: { commentId: id },
      });
    }

    await this.CommentRepo.destroy({ where: { id } });

    return { message: 'Комментарий удален' };
  }
}
