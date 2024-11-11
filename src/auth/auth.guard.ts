import {
  Injectable,
  CanActivate,
  ExecutionContext,
  // ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { User } from '../user/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user is added to request after login
    console.log(request.user);
    console.log('User in AdminGuard:', user);
    if (user && user.role === 'ADMIN') {
      return true;
    }
    throw new UnauthorizedException('Access denied');
  }
  // constructor(private reflector: Reflector) {}

  // canActivate(context: ExecutionContext): boolean {
  //   const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);

  //   if (!requiredRoles) {
  //     return true;
  //   }

  //   const { user } = context.switchToHttp().getRequest();

  //   if (!requiredRoles.includes(user.role)) {
  //     throw new ForbiddenException('Access denied');
  //   }

  //   return true;
  // }
}
