import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/decorators/publicRoutes-decorator';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get('search')
  async search(@Request() req, @Query() searchUserDto: SearchUserDto) {
    const users = await this.usersService.searchUsers(
      searchUserDto.query,
      +req.user.id,
    );
    return users;
  }

  @Public()
  @Post('test')
  foo(@Body() dto: { email: string }) {
    return this.usersService.getUserByEmail(dto.email);
  }
}
