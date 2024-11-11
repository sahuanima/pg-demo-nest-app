// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/user-login.dto'; // Importing the LoginUserDto

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async userLogin(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.validateUser(loginUserDto); // Pass the entire DTO

    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Using UnauthorizedException for better error handling
    }

    //Generate JWT token
    const payload = { email: user.email, role: user.role, id: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
  // catch(error) {
  //   console.error('Error during login in AuthService:', error.message || error);
  //   throw new UnauthorizedException('Login failed');
  // }
}
