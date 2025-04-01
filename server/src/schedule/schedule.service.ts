import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from 'src/classes/classes.model';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Class) private ClassRepo: typeof Class) {}

  async findAll(userId: number) {
    const classesArr = await this.ClassRepo.findAll({
      where: {
        userId,
      },
      order: [['createdAt', 'ASC']],
    });
    const schedule = [];
    let classesPerDay = [];
    ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].forEach((dayEl) => {
      classesArr.forEach((classEl) => {
        classEl.schedule.forEach((shedEl) => {
          if (shedEl.day === dayEl) classesPerDay.push(classEl);
        });
      });
      schedule.push(classesPerDay);
      classesPerDay = [];
    });
    return schedule;
  }
}
