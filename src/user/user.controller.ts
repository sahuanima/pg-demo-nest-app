import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
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

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(@Param('id') id: string, @Request() req): Promise<User> {
    // Log the received data for debugging
    console.log('Requested ID:', id);
    console.log('User from JWT:', req.user);

    // Ensure req.user exists and contains an id
    if (!req.user || typeof req.user.id === 'undefined') {
      throw new UnauthorizedException(
        'User information is missing from request.',
      );
    }

    // Get the logged-in user's ID from req.user
    const loggedInUserId = req.user.id;

    // Check if the logged-in user is accessing their own data
    if (id === String(loggedInUserId)) {
      // Allow access if the user is trying to access their own data
      const user = await this.userService.getUserById(loggedInUserId);
      if (!user) {
        throw new UnauthorizedException('User not found.');
      }
      return user;
    } else {
      // Deny access if the user is trying to access another user's data
      throw new UnauthorizedException(
        "Access denied. You are not authorized to view this user's details.",
      );
    }
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard) // Protect this route with AdminGuard
  @Post('create')
  async createAdmin(@Body() createUserDto: CreateUserDto): Promise<any> {
    createUserDto.role = 'ADMIN'; // Set the role to ADMIN
    return this.userService.userRegistration(createUserDto);
  }
}
