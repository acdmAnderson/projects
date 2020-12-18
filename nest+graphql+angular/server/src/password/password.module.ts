import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordResolver } from './password.resolver';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/auth/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtSecret.secret,
      signOptions: { expiresIn: '1800s' }
    }),
  ],
  providers: [PasswordService, PasswordResolver]
})
export class PasswordModule { }
