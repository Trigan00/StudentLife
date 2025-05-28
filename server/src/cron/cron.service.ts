import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Class } from 'src/classes/classes.model';
import getCurrentSemester from 'src/helpers/getCurrentSemester';
import { User } from 'src/users/users.model';
import * as dotenv from 'dotenv';
import { MailService } from 'src/mail/mail.service';
import { Task } from 'src/tasks/entities/tasks.model';
import * as dayjs from 'dayjs';
dotenv.config();

@Injectable()
export class CronService {
  constructor(
    @InjectModel(Class) private ClassRepo: typeof Class,
    @InjectModel(User) private UserRepo: typeof User,
    @InjectModel(Task) private TaskRepo: typeof Task,
    private mailService: MailService,
  ) {}

  // async onModuleInit() {
  //   await this.handleDeadlines(); // Вызов при запуске приложения
  // }

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

  @Cron(process.env.SPRING_SEM_START) // мин, час, день, месяц, деньНедели
  async handleSeptember() {
    console.log('📘 Запуск завершения предметов - 1 сентября');
    await this.markCompletedClasses();
  }

  // Запуск 1 февраля в 00:00
  @Cron(process.env.AUtUMN_SEM_START)
  async handleFebruary() {
    console.log('📗 Запуск завершения предметов - 1 февраля');
    await this.markCompletedClasses();
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleDeadlines() {
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

    const tasks = await this.TaskRepo.findAll({
      include: [User],
    });

    for (const task of tasks) {
      if (!task.deadLine) continue;

      const taskDate = dayjs(task.deadLine).format('YYYY-MM-DD');

      if (taskDate === tomorrow) {
        for (const user of task.users) {
          await this.mailService.sendMail({
            to: user.email,
            subject: `Напоминание: завтра дедлайн по задаче "${task.title}"`,
            text: `Не забудьте, что завтра (${taskDate}) дедлайн по задаче "${task.title}"`,
          });
        }
      }
    }
  }
}
