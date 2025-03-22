import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'не должно быть пустым' })
  readonly text: string;

  readonly taskId: string;
}
