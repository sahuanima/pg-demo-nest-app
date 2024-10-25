import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.userLogin(
      createUserDto.email,
      createUserDto.password,
    );
  }
}
