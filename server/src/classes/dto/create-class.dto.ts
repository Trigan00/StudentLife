import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'не должно быть пустым' })
  readonly name: string;

  readonly mode: string;
  readonly room: string;
  readonly building: string;
  readonly teacher: string;
  readonly schedule: { day: string; startTime: string; evenness: string }[];
  readonly examType: string;
}
