import { AuthGuard } from '@nestjs/passport';
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';

@Injectable()
export class JwtAuthGuardService extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
      }
    
      handleRequest(err, user, info) {
        if (err || !user) {
          console.log(err, user, info);
          throw err || new UnauthorizedException();
        }
        return user;
      }
}
