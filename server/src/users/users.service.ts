import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

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
