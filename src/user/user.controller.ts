import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  // InternalServerErrorException,
  // Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async userRegister(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.userRegistration(createUserDto);
  }

  @Post('login')
  async userLogin(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.userLogin(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<User> {
    return req.user;
  }
}
