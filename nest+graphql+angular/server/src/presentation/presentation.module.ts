import { Module } from '@nestjs/common'
import { EmailValidator } from './contracts'
import { EmailValidatorAdapter } from '../utils/email-validator-adapter'
@Module({
  providers: [
    {
      provide: EmailValidator,
      useClass: EmailValidatorAdapter
    }
  ]
})
export class PresentationModule {}
