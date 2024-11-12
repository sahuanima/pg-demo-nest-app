import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

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
}
