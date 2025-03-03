import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UsePipes,
  Headers,
} from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { AddPasswordDto } from './dto/add-password.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @Post('addPassword')
  addPassword(
    @Request() req,
    @Headers() headers,
    @Body() passwordDto: AddPasswordDto,
  ) {
    return this.passwordsService.addPassword(
      req.user.id,
      passwordDto,
      headers.secretkey,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('allPasswords')
  getAllPasswords(@Request() req) {
    return this.passwordsService.getAllPasswords(req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('decrypt/:id')
  decryptPassword(@Param('id') id: string, @Headers() headers) {
    return this.passwordsService.decryptPassword(id, headers.secretkey);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('deletePassword/:id')
  deletePassword(@Param('id') id: string) {
    return this.passwordsService.deletePassword(id);
  }

  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @Put('updatePassword')
  updatePassword(@Headers() headers, @Body() passwordDto: UpdatePasswordDto) {
    return this.passwordsService.updatePassword(passwordDto, headers.secretkey);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('generate')
  generatePassword() {
    return this.passwordsService.generatePassword();
  }
}
