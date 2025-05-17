import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';
import { Task } from 'src/tasks/entities/tasks.model';
import * as dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    @InjectModel(Task) private taskRepo: typeof Task,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto);
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepo.findAll();
    return users;
  }

  async update(id: number, updateUserDto: { username: string }) {
    this.userRepo.update(updateUserDto, { where: { id } });

    return { message: 'Данные были обновлены' };
  }

  async searchUsers(query: string, currentUserId: number): Promise<User[]> {
    return this.userRepo.findAll({
      where: {
        username: {
          [Op.iLike]: `%${query}%`, // Поиск без учёта регистра
        },
        id: {
          [Op.ne]: currentUserId, // Исключить пользователя с этим id
        },
      },
      attributes: ['id', 'username', 'email'], // Только нужные поля
      limit: 10, // Ограничить количество результатов
    });
  }

  async getProfile(userId: number) {
    const now = dayjs().format();

    const [user, completed, overdue, notCompleted] = await Promise.all([
      this.userRepo.findOne({
        where: { id: userId },
        attributes: ['id', 'username', 'email'],
      }),

      this.taskRepo.count({
        include: [
          {
            association: Task.associations.users,
            where: { id: userId },
          },
        ],
        where: { completed: true },
      }),

      this.taskRepo.count({
        include: [
          {
            association: Task.associations.users,
            where: { id: userId },
          },
        ],
        where: {
          completed: false,
          deadLine: { [Op.lt]: now },
        },
      }),

      this.taskRepo.count({
        include: [
          {
            association: Task.associations.users,
            where: { id: userId },
          },
        ],
        where: { completed: false },
      }),
    ]);

    return {
      user,
      completed,
      overdue,
      notCompleted,
    };
  }

  async getNotifications(userId: number) {
    const termWorks = await this.taskRepo.findAll({
      include: [
        {
          association: Task.associations.users,
          where: { id: userId },
        },
      ],
      where: {
        type: 'Курсовая работа',
      },
    });
    const practicalWorks = await this.taskRepo.findAll({
      include: [
        {
          association: Task.associations.users,
          where: { id: userId },
        },
      ],
      where: {
        type: 'Практика',
      },
    });

    const today = new Date();
    const isFirstOfSeptember =
      today.getDate() === 1 &&
      today.getMonth() ===
        Number(process.env.SPRING_SEM_START.split(' ')[3]) - 1;
    const isFirstOfFebruary =
      today.getDate() === 1 &&
      today.getMonth() ===
        Number(process.env.AUtUMN_SEM_START.split(' ')[3]) - 1;

    return {
      isTermWorks: !!termWorks.length,
      isPracticalWorks: !!practicalWorks,
      isNewSem: isFirstOfSeptember || isFirstOfFebruary,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }

  async verifyUser(activationLink: string) {
    const user = await this.userRepo.update(
      { isActivated: true },
      {
        where: {
          activationLink,
        },
      },
    );
    return user;
  }
}
