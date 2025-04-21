import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from 'src/comments/entities/comments.model';
import { Op } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/users/users.model';
import { FileAttachment } from 'src/comments/entities/file-attachment.model.ts';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private TaskRepo: typeof Task,
    @InjectModel(User) private UserRepo: typeof User, // Теперь инжектим UserRepo
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { userIds, ...taskData } = createTaskDto;

    const users = await this.UserRepo.findAll({ where: { id: userIds } });
    if (users.length !== userIds.length) {
      throw new HttpException(
        'Один или несколько пользователей не найдены',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingTask = await this.TaskRepo.findOne({
      where: {
        title: taskData.title,
        classId: taskData.classId,
      },
      include: [
        {
          model: User,
          where: { id: userIds },
          required: false,
        },
      ],
    });

    if (existingTask) {
      throw new HttpException(
        'Такая задача уже существует для одного из пользователей',
        HttpStatus.BAD_REQUEST,
      );
    }

    const task = await this.TaskRepo.create(taskData);
    await task.$set('users', users);

    return { classId: task.classId, message: 'Задача добавлена' };
  }

  async findAll(userId: number) {
    const tasks = await this.TaskRepo.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
          through: { attributes: [] },
        },
      ],
      order: [['createdAt', 'ASC']],
    });
    return tasks;
  }

  async findBySubject(userId: number, classId: number, deadline: string) {
    const dayTasks = await this.TaskRepo.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
          through: { attributes: [] },
        },
      ],
      where: { classId, deadLine: deadline },
    });

    const dayTaskIds = dayTasks.map((task) => task.id);

    const classTasks = await this.TaskRepo.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
          through: { attributes: [] },
        },
      ],
      where: {
        classId,
        id: {
          [Op.notIn]: dayTaskIds,
        },
      },
      order: [['createdAt', 'ASC']],
    });

    return { dayTasks, classTasks };
  }

  async findOne(id: number) {
    const task = await this.TaskRepo.findOne({
      where: { id },
      include: [User],
    });
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { userIds, ...updateData } = updateTaskDto;

    const task = await this.TaskRepo.findByPk(id);
    if (!task) {
      throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
    }

    await task.update(updateData);

    if (userIds) {
      const users = await this.UserRepo.findAll({ where: { id: userIds } });
      if (users.length !== userIds.length) {
        throw new HttpException(
          'Один или несколько пользователей не найдены',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Переустанавливаем связь
      await task.$set('users', users);
    }

    return { id: task.id, classId: task.classId, message: 'Задача обновлена' };
  }

  async remove(id: number) {
    const task = await this.TaskRepo.findOne({
      where: { id },
      include: [
        {
          model: Comment,
          include: [FileAttachment],
        },
      ],
    });

    if (!task) {
      throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
    }

    if (task.comments?.length) {
      for (const comment of task.comments) {
        if (comment.attachments?.length) {
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
      where: { id },
    });

    return { classId: task.classId, message: 'Задача удалена' };
  }
}
