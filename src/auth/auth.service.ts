import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async userLogin(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new Error('invalid credentials');
    }

    const payload = { email: user.email, role: user.role, id: user.id };
    const access_token = await this.jwtService.sign(payload);
    return { access_token };
  }
}
