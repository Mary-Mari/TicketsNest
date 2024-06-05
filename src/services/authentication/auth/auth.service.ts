import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {
    super({ usernameField: 'login', passwordField: 'psw' });
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.userService.checkAuthUser(login, password);
    if (!user) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        errorText: 'Пользователь не найден в базе'
      }, HttpStatus.CONFLICT);
    }
    return true; // Возвращаем данные пользователя
  }

  async login(user: any) {
    const payload = { username: user.login, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


