import { Module } from '@nestjs/common'
import { AddAccount } from '../domain/usecases/add-account'
import { DbAddAccount } from './usecases/add-account/db-add-account'
@Module({
  providers: [
    {
      provide: AddAccount,
      useClass: DbAddAccount
    }
  ]
})
export class DataModule {}
