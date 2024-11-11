import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from './user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(private readonly connection: Connection) {}

  async seed() {
    const userRepository = this.connection.getRepository(User);

    // Check if admin already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: 'anima@example.com' },
    });

    if (!existingAdmin) {
      // Hash password directly in the seeder
      const hashedPassword = await bcrypt.hash('AnimaPassword123', 10);

      const admin = userRepository.create({
        firstName: 'Anima',
        lastName: 'Admin',
        email: 'anima@example.com',
        password: hashedPassword,
        mobileNo: '1234545690',
        countryCode: '+91',
        role: 'ADMIN',
        access: ['create', 'read', 'update', 'delete'],
      });

      await userRepository.save(admin);
      console.log('Admin user created: ', admin);
    } else {
      console.log('Admin user already exists: ', existingAdmin);
    }
  }
}
