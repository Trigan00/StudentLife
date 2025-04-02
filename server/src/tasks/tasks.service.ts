import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { FileAttachment } from 'src/comments/entities/file-attachment.model.ts';
import * as fs from 'fs';
import * as path from 'path';
import { Comment } from 'src/comments/entities/comments.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private TaskRepo: typeof Task) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
    const candidate = await this.TaskRepo.findOne({
      where: {
        title: createTaskDto.title,
        userId,
        classId: createTaskDto.classId,
      },
    });
    if (candidate)
      throw new HttpException(
        'Такая задача уже существует',
        HttpStatus.BAD_REQUEST,
      );

    await this.TaskRepo.create({
      ...createTaskDto,
      userId,
    });

    return { message: 'Задача добавлена' };
  }

  async findAll(userId: number) {
    const tasksArr = await this.TaskRepo.findAll({
      where: {
        userId,
      },
      order: [['createdAt', 'ASC']],
    });
    return tasksArr;
  }

  async findOne(id: number) {
    const taskInfo = await this.TaskRepo.findOne({
      where: { id },
    });
    return taskInfo;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    this.TaskRepo.update(updateTaskDto, { where: { id } });

    return { id, message: 'Задача обновлена' };
  }

  async remove(id: number) {
    const taskInfo = await this.TaskRepo.findOne({
      where: { id },
      include: [
        {
          model: Comment,
          include: [FileAttachment],
        },
      ],
    });

    if (taskInfo.comments.length) {
      for (const comment of taskInfo.comments) {
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

    await this.TaskRepo.destroy({
      where: {
        id,
      },
    });
    return { message: 'Задача удалена' };
  }
}
