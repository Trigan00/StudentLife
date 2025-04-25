import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
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

  @Get('profile')
  async getProfile(@Request() req) {
    const profile = await this.usersService.getProfile(+req.user.id);
    return profile;
  }

  @Public()
  @Post('test')
  foo(@Body() dto: { email: string }) {
    return this.usersService.getUserByEmail(dto.email);
  }
}
