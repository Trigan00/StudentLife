import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Options, passwordStrength } from 'check-password-strength';
import { Password } from './passwords.model';
import { AddPasswordDto } from './dto/add-password.dto';
import passwordStrengthOptions from '../helpers/passwordStrengthOptions';
import encryption from 'src/helpers/encryption';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as generator from 'generate-password';

@Injectable()
export class PasswordsService {
  constructor(@InjectModel(Password) private PasswordRepo: typeof Password) {}

  async addPassword(
    userId: string,
    passwordDto: AddPasswordDto,
    secretKey: string,
  ) {
    const candidate = await this.PasswordRepo.findOne({
      where: { title: passwordDto.title, userId },
    });
    if (candidate)
      throw new HttpException(
        'Такой пароль уже существует',
        HttpStatus.BAD_REQUEST,
      );

    const pwStrength = passwordStrength(
      passwordDto.password,
      passwordStrengthOptions as Options<string>,
    ).id;
    const encryptedPassword = encryption.encrypt(
      passwordDto.password,
      secretKey,
    );

    await this.PasswordRepo.create({
      ...passwordDto,
      userId,
      password: pwStrength + encryptedPassword,
    });

    return { message: 'Пароль добавлен' };
  }

  async getAllPasswords(userId: string) {
    const passwordsArr = await this.PasswordRepo.findAll({
      where: {
        userId,
      },
    });
    return passwordsArr.map(
      (pas) =>
        new Object({
          id: pas.id,
          title: pas.title,
          passwordStrength: pas.password[0],
        }),
    );
  }
  async decryptPassword(id: string, secretKey: string) {
    const password = await this.PasswordRepo.findOne({
      where: { id },
    });
    const decryptedPassword = encryption.decrypt(
      password.password.substring(1),
      secretKey,
    );

    return {
      id: password.id,
      title: password.title,
      login: password.login,
      url: password.url,
      password: decryptedPassword,
      passwordStrength: password.password[0],
    };
  }

  async deletePassword(id) {
    await this.PasswordRepo.destroy({
      where: {
        id,
      },
    });
    return { message: 'Пароль удален' };
  }

  async updatePassword(passwordDto: UpdatePasswordDto, secretKey: string) {
    const pwStrength = passwordStrength(
      passwordDto.password,
      passwordStrengthOptions as Options<string>,
    ).id;
    const encryptedPassword = encryption.encrypt(
      passwordDto.password,
      secretKey,
    );

    this.PasswordRepo.update(
      {
        login: passwordDto.login,
        title: passwordDto.title,
        password: pwStrength + encryptedPassword,
        url: passwordDto.url,
      },
      { where: { id: passwordDto.id } },
    );

    return { message: 'Пароль обновлен' };
  }

  async generatePassword() {
    const generatedPassword = generator.generate({
      length: 12,
      symbols: true,
      numbers: true,
    });

    return { password: generatedPassword };
  }
}
