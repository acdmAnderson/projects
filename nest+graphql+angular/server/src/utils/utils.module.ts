import { Module } from '@nestjs/common'
import { EmailValidator } from '../presentation/contracts'
import { EmailValidatorAdapter } from './email-validator-adapter'

@Module({
  providers: [
    {
      provide: EmailValidator,
      useValue: EmailValidatorAdapter
    }
  ]
})
export class UtilsModule {}
