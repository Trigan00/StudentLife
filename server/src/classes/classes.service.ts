import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './classes.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ClassesService {
  constructor(@InjectModel(Class) private ClassRepo: typeof Class) {}

  async create(userId: number, createClassDto: CreateClassDto) {
    const candidate = await this.ClassRepo.findOne({
      where: { name: createClassDto.name, userId },
    });
    if (candidate)
      throw new HttpException(
        'Такое занятие уже существует',
        HttpStatus.BAD_REQUEST,
      );

    await this.ClassRepo.create({
      ...createClassDto,
      userId,
    });

    return { message: 'Занятие добавлено' };
  }

  async findAll(userId: number) {
    const classesArr = await this.ClassRepo.findAll({
      where: {
        userId,
      },
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
    await this.ClassRepo.destroy({
      where: {
        id,
      },
    });
    return { message: 'Занятие удалено' };
  }
}
