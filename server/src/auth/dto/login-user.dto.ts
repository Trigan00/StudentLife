import { IsString, IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  // @Length(12, 30, { message: 'Не меньше 12 и не больше 30' })
  readonly password: string;

  // readonly code: string;
}
