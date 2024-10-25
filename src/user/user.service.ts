import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async userRegistration(createUserDto: CreateUserDto): Promise<any> {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPass = await bcrypt.hash(createUserDto.password, salt);

      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPass,
      });
      console.log(createUserDto);
      console.log(newUser);
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

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('invalid credentials');
      }

      return user;
    } catch {
      throw new UnauthorizedException('User validation failed');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { email },
      });
    } catch {
      throw new UnauthorizedException('user not found');
    }
  }
}
