import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { LoginUserDto } from './user-login.dto';
import { User } from './user.entity';
import { AdminGuard } from '../auth/auth.guard'; // Protect routes that need admin access
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.userRegistration(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { message: 'Login successful', user };
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard) // Protect this route with AdminGuard
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const userId = Number(id); // Convert string to number
    if (isNaN(userId)) {
      throw new UnauthorizedException('Invalid user ID');
    }
    return this.userService.getUserById(userId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard) // Protect this route with AdminGuard
  @Post('create')
  async createAdmin(@Body() createUserDto: CreateUserDto): Promise<any> {
    createUserDto.role = 'ADMIN'; // Set the role to ADMIN
    return this.userService.userRegistration(createUserDto);
  }
}
