import { Module } from '@nestjs/common'
import { EmailValidator } from '../presentation/contracts'
import { EmailValidatorAdapter } from './email-validator-adapter'

@Module({
  providers: [
    {
      provide: EmailValidator,
      useClass: EmailValidatorAdapter
    }
  ]
})
export class UtilsModule {}
