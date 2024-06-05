import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../shemas/user';
import { UserDto } from '../../dto/users-dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../services/authentication/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService,
             private authService: AuthService
  ) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  
  @Post('auth')
  async authUser(@Body() data: UserDto): Promise<User> {
  const users = await this.userService.checkAuthUser(data.login, data.psw);
  if (users && users.length > 0) {
    return users[0]; // Возвращаем первого пользователя из массива
  } else {
    throw new HttpException({
      status: HttpStatus.CONFLICT,
      errorText: 'Пользователь не найден в базе',
    }, HttpStatus.CONFLICT);
  }
}

  @UseGuards(AuthGuard('local'))
  @Post(':login')
  async loginUser(@Body() data: UserDto): Promise<{ access_token: string }> {
    const user = await this.authService.validate(data.login, data.psw);
    return this.authService.login(data);
  }

  @Put(':id')
  async updateUsers(@Param('id') id: string, @Body() updatedUserData: any): Promise<User> {
    return this.userService.updateUsers(id, updatedUserData);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
