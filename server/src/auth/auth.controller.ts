import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/publicRoutes-decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: LoginUserDto,
  ) {
    const userData = await this.authService.login(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000, //1 day
      httpOnly: true,
    });
    return userData.user;
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @Post('registration')
  registration(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: RegisterUserDto,
  ) {
    return this.authService.registration(userDto);
  }

  @Public()
  @HttpCode(HttpStatus.PERMANENT_REDIRECT)
  @Get('activate/:link')
  activation(@Res() res: Response, @Param('link') link: string) {
    return this.authService.activation(res, link);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    res.clearCookie('refreshToken');
    return this.authService.logout(refreshToken);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const userData = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData.user;
  }
}
