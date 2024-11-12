import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'abcdefghi',
    });
  }

  async validate(payload: any) {
    console.log('Payload in JwtStrategy:', payload);
    if (!payload || !payload.userId) {
      throw new UnauthorizedException('Invalid token: User ID is missing.');
    }
    return { id: payload.userId, email: payload.email, role: payload.role };
  }
}
