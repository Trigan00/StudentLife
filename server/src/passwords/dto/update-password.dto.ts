import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNumber()
  readonly id: number;

  @IsNotEmpty({ message: 'не должно быть пустым' })
  readonly title: string;

  @IsNotEmpty({ message: 'не должно быть пустым' })
  readonly password: string;

  @IsNotEmpty({ message: 'не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly login: string;

  readonly url: string;
}
