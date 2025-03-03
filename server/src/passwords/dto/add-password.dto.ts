import { IsNotEmpty, IsString } from 'class-validator';

export class AddPasswordDto {
  @IsNotEmpty({ message: 'не должно быть пустым' })
  readonly title: string;

  @IsNotEmpty({ message: 'не должно быть пустым' })
  readonly password: string;

  @IsNotEmpty({ message: 'не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly login: string;

  readonly url: string;
}
