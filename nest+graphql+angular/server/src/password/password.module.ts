import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordResolver } from './password.resolver';

@Module({
  providers: [PasswordService, PasswordResolver]
})
export class PasswordModule {}
