import { IsString, IsEmail, Length, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly username: string;

  @Length(8, undefined, {
    message: 'В пароле должно быть не менее 8 символов.',
  })
  @Matches(/(?=.*\d).*$/, {
    message: 'Необходимо наличие цифр',
  })
  @Matches(/(?=.*[\W]).*$/, {
    message: 'Необходимо наличие специальных знаков',
  })
  @Matches(/(?=.*[a-zA-Z]).*$/, {
    message: 'Необходимо наличие символов латинского алфавита',
  })
  readonly password: string;
}
