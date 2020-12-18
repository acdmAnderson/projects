import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordResolver } from './password.resolver';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [UserModule],
  providers: [PasswordService, PasswordResolver]
})
export class PasswordModule {}
