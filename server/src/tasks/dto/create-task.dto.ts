import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'не должно быть пустым' })
  readonly title: string;

  readonly description: string;
  readonly priority: number;
  readonly deadLine: string;

  readonly className: string;

  @IsNotEmpty({ message: 'не должно быть пустым' })
  readonly classId: number;

  @IsNotEmpty({ each: true, message: 'не должно быть пустым' })
  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}
