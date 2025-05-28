import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { v4 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private mailService: MailService,
    private tokenService: TokenService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user)
      throw new HttpException(
        'Некорректный email или пароль',
        HttpStatus.BAD_REQUEST,
      );

    if (!user.isActivated)
      throw new HttpException('Аккаунт не активирован', HttpStatus.BAD_REQUEST);

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!user || !passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }
    // const secretKey = CryptoJS.SHA256(userDto.password);
    const tokens = this.tokenService.generateTokens({
      email: user.dataValues.email,
      username: user.username,
      id: user.dataValues.id,
    });
    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      refreshToken: tokens.refreshToken,
      user: {
        email: user.email,
        id: user.id,
        token: tokens.accessToken,
        message: 'Успешный вход',
        // secretKey: String(secretKey),
      },
    };
  }

  async registration(userDto: RegisterUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate)
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    const hashPassword = await bcrypt.hash(userDto.password, 12);
    const activationLink = v4();

    const link = `${process.env.API_URL}/api/auth/activate/${activationLink}`;

    await this.mailService.sendMail({
      to: userDto.email,
      subject: 'Account activation on ' + process.env.API_URL,
      html: `
                        <div>
                            <h3>To activate, follow the link</h3>
                            <a href="${link}">${link}</a>
                        </div>
                    `,
    });

    await this.userService.createUser({
      email: userDto.email,
      password: hashPassword,
      username: userDto.username,
      activationLink,
      studyStartDate: new Date(userDto.studyStartDate),
      // secret2fa: encryption.encrypt(secret2fa.base32, process.env.twoFASecret),
    });

    return {
      // QRCodeUrl,
      message: 'Пользователь добавлен. Поддтвердите email!',
    };
  }

  async activation(res, link: string) {
    const candidate = await this.userService.verifyUser(link);
    if (!candidate)
      throw new HttpException(
        'Invalid activation link',
        HttpStatus.BAD_REQUEST,
      );

    return res.redirect(process.env.CLIENT_URL);
  }

  async logout(refreshToken: string) {
    if (!refreshToken) return;
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUserByEmail(
      userData.email || userData.dataValues.email,
    );
    const tokens = this.tokenService.generateTokens({
      email: user.email,
      username: user.username,
      id: user.id,
    });

    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      refreshToken: tokens.refreshToken,
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
        token: tokens.accessToken,
        message: 'ОК',
      },
    };
  }
}
