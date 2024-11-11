import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
// import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';
// import { JwtStrategy } from './jwt.strategy';

// import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'abcdefghi',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
