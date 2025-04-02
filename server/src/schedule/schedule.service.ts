import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from 'src/classes/classes.model';
import * as dayjs from 'dayjs';

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
          if (shedEl.day === dayEl)
            classesPerDay.push({
              ...classEl.dataValues,
              time: shedEl.startTime,
            });
        });
      });
      const referenceTime = dayjs().format('YYYY-MM-DD HH:mm'); // Например, текущее время

      const sortedData = [...classesPerDay].sort((a, b) => {
        const timeA = dayjs(a.time, 'YYYY-MM-DD HH:mm');
        const timeB = dayjs(b.time, 'YYYY-MM-DD HH:mm');
        const refTime = dayjs(referenceTime, 'YYYY-MM-DD HH:mm');

        // Сортируем по разнице с referenceTime
        return Math.abs(timeB.diff(refTime)) - Math.abs(timeA.diff(refTime));
      });
      schedule.push(sortedData);
      classesPerDay = [];
    });
    return schedule;
  }
}
