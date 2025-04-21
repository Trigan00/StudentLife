import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto);
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepo.findAll();
    return users;
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
