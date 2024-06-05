import { Module } from '@nestjs/common';
 
import { User, UserSchema } from "../../shemas/user";
import { AuthService } from 'src/services/authentication/auth/auth.service';
import { JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/services/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { jwtConstants } from "../../static/private/constants";
import { JwtStrategyService } from 'src/services/authentication/jwt-strategy/jwt-strategy.service';


@Module({
    imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
      }),
    ],
    providers: [AuthService, UsersService, JwtStrategyService],
    controllers: [UsersController],
  })
  export class UserModule {}