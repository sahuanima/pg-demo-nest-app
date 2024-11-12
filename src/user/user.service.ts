import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './user-login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async userRegistration(createUserDto: CreateUserDto): Promise<any> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPass = await bcrypt.hash(createUserDto.password, salt);

      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPass,
      });

      await this.userRepository.save(newUser);
      const message =
        newUser.role === 'ADMIN'
          ? 'Admin registration successful'
          : 'User registration successful';

      return { message, newUser };
    } catch {
      throw new UnauthorizedException('User validation failed');
    }
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
      });
      if (
        !user ||
        !(await bcrypt.compare(loginUserDto.password, user.password))
      ) {
        throw new Error('invalid credentials');
      }

      return user;
    } catch {
      throw new UnauthorizedException('User validation failed');
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
