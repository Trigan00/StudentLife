import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Class } from 'src/classes/classes.model';
import getCurrentSemester from 'src/helpers/getCurrentSemester';
import { User } from 'src/users/users.model';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(Class) private ClassRepo: typeof Class,
    @InjectModel(User) private UserRepo: typeof User,
  ) {}

  async markCompletedClasses() {
    // Получаем всех пользователей, чтобы узнать их дату начала учёбы
    const users = await this.UserRepo.findAll();

    for (const user of users) {
      const currentSemester = getCurrentSemester(new Date(user.studyStartDate));

      // Завершаем все предметы пользователя, начавшиеся в предыдущие семестры и не завершённые
      await this.ClassRepo.update(
        { completed: true },
        {
          where: {
            userId: user.id,
            semester: { [Op.lt]: currentSemester },
            completed: false,
          },
        },
      );
    }
  }

  @Cron('0 0 1 9 *') // мин, час, день, месяц, деньНедели
  async handleSeptember() {
    console.log('📘 Запуск завершения предметов - 1 сентября');
    await this.markCompletedClasses();
  }

  // Запуск 1 февраля в 00:00
  @Cron('0 0 1 2 *')
  async handleFebruary() {
    console.log('📗 Запуск завершения предметов - 1 февраля');
    await this.markCompletedClasses();
  }
}
