import { IsNotEmpty } from 'class-validator';

export class CreateExamQandADto {
  @IsNotEmpty({ message: 'не должно быть пустым' })
  readonly question: string;

  readonly answer: string;

  readonly classId: string;
}
