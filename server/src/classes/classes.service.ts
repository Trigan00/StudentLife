import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './classes.model';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from 'src/tasks/entities/tasks.model';
import { Comment } from 'src/comments/entities/comments.model';
import { FileAttachment } from 'src/comments/entities/file-attachment.model.ts';
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/users/users.model';
import getCurrentSemester from 'src/helpers/getCurrentSemester';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class) private ClassRepo: typeof Class,
    @InjectModel(User) private UserRepo: typeof User,
  ) {}

  async create(userId: number, createClassDto: CreateClassDto) {
    const user = await this.UserRepo.findByPk(userId);
    if (!user || !user.studyStartDate) {
      throw new HttpException(
        'Пользователь не найден или не указана дата начала обучения',
        HttpStatus.BAD_REQUEST,
      );
    }

    const candidate = await this.ClassRepo.findOne({
      where: { name: createClassDto.name, userId },
    });
    if (candidate)
      throw new HttpException(
        'Такое занятие уже существует',
        HttpStatus.BAD_REQUEST,
      );

    const semester = getCurrentSemester(new Date(user.studyStartDate));

    await this.ClassRepo.create({
      ...createClassDto,
      semester,
      userId,
    });

    return { message: 'Занятие добавлено' };
  }

  async findAll(userId: number) {
    const classesArr = await this.ClassRepo.findAll({
      where: {
        userId,
      },
      order: [['createdAt', 'ASC']],
    });
    return classesArr;
  }

  async findOne(id: number) {
    const classInfo = await this.ClassRepo.findOne({
      where: { id },
    });
    return classInfo;
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    this.ClassRepo.update(updateClassDto, { where: { id } });

    return { message: 'Занятие обновлено' };
  }

  async remove(id: number) {
    const classInfo = await this.ClassRepo.findOne({
      where: { id },
      include: [
        {
          model: Task,
          include: [
            {
              model: Comment,
              include: [FileAttachment],
            },
          ],
        },
      ],
    });

    if (classInfo.tasks.length) {
      for (const task of classInfo.tasks) {
        if (task.comments.length) {
          for (const comment of task.comments) {
            if (comment.attachments.length) {
              for (const attachment of comment.attachments) {
                const filePath = path.join(
                  __dirname,
                  '../../uploads',
                  attachment.path,
                );

                if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath);
                }
              }
            }
          }
        }
      }
    }

    await this.ClassRepo.destroy({
      where: {
        id,
      },
    });
    return { message: 'Занятие удалено' };
  }
}
