import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token) private tokenRepo: typeof Token) {}

  generateTokens(payload: { email: string; id: number }) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '1d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): jwt.JwtPayload {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData as jwt.JwtPayload;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepo.findOne({ where: { userId } });
    if (tokenData) {
      const token = await this.tokenRepo.update(
        { refreshToken },
        {
          where: {
            userId,
          },
        },
      );
      return token;
    }
    const token = await this.tokenRepo.create({ userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenRepo.destroy({
      where: {
        refreshToken,
      },
    });

    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await this.tokenRepo.findOne({ where: { refreshToken } });
    return tokenData;
  }
}
