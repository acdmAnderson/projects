import { Module } from '@nestjs/common'
import { EmailValidator } from './contracts'
import { EmailValidatorAdapter } from '../utils/email-validator-adapter'
import { DbAddAccount } from '../data/usecases/add-account/db-add-account'
import { AddAccount } from '../domain/usecases/add-account'
@Module({
  providers: [
    {
      provide: EmailValidator,
      useValue: EmailValidatorAdapter
    },
    {
      provide: AddAccount,
      useValue: DbAddAccount
    }
  ]
})
export class PresentationModule {}
