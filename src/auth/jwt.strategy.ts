import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
// import { User } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'abcdefghi',
    });
  }

  // async validate(payload: any): Promise<User> {
  //   // Directly using findOne method here
  //   const user = await this.userService.findByEmail(payload.email);

  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   return user;
  // }
  async validate(payload: any) {
    console.log('Payload in JwtStrategy:', payload);
    return { userId: payload.id, email: payload.email, role: payload.role };
  }
}
