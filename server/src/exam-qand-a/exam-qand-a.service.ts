import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExamQandADto } from './dto/create-exam-qand-a.dto';
import { UpdateExamQandADto } from './dto/update-exam-qand-a.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FileAttachment } from 'src/comments/entities/file-attachment.model.ts';
import { ExamQandA } from './examQandA.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ExamQandAService {
  constructor(
    @InjectModel(ExamQandA)
    private ExamQandARepo: typeof ExamQandA,
    @InjectModel(FileAttachment)
    private FileAttachmentRepo: typeof FileAttachment,
  ) {}

  async create(
    userId: number,
    createExamQandADto: CreateExamQandADto,
    files: Express.Multer.File[],
  ) {
    const candidate = await this.ExamQandARepo.findOne({
      where: {
        question: createExamQandADto.question,
        classId: Number(createExamQandADto.classId),
      },
    });
    if (candidate)
      throw new HttpException(
        'Такой вопрос уже существует',
        HttpStatus.BAD_REQUEST,
      );

    const QandA = await this.ExamQandARepo.create({
      ...createExamQandADto,
      classId: Number(createExamQandADto.classId),
    });

    if (files?.length) {
      const attachments = files.map((file) => ({
        filename: file.originalname,
        path: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        attachmentType: 'answer',
        attachmentId: QandA.id,
      }));

      // await this.FileAttachmentRepo.bulkCreate(attachments);
    }

    return { message: 'Вопрос добавлен', classId: QandA.classId };
  }

  async findAll(classId: number) {
    const QandAArr = await this.ExamQandARepo.findAll({
      where: {
        classId,
      },
      order: [['createdAt', 'ASC']],
      include: [{ model: FileAttachment }],
    });

    return QandAArr;
  }

  findOne(id: number) {
    return `This action returns a #${id} examQandA`;
  }

  update(id: number, updateExamQandADto: UpdateExamQandADto) {
    return `This action updates a #${id} examQandA`;
  }

  async remove(id: number) {
    const QandA = await this.ExamQandARepo.findOne({
      where: { id },
      include: [{ model: FileAttachment }],
    });

    if (!QandA) {
      throw new HttpException('Вопрос не найден', HttpStatus.NOT_FOUND);
    }

    if (QandA.attachments.length) {
      for (const attachment of QandA.attachments) {
        const filePath = path.join(
          __dirname,
          '../../QandA-uploads',
          attachment.path,
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await this.FileAttachmentRepo.destroy({
        where: {
          attachmentId: id,
          attachmentType: 'answer',
        },
      });
    }

    await this.ExamQandARepo.destroy({ where: { id } });

    return { message: 'Вопрос удален', classId: QandA.classId };
  }
}
