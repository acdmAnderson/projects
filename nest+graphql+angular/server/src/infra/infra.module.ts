import { Module } from '@nestjs/common'
import { DataModule } from '../data/data.module'
import { AddAccountRepository } from '../data/contracts/add-account-repository'
import { AccountMongoRepository } from './db/mongodb/account-repository/account'
@Module({
  imports: [DataModule],
  providers: [
    {
      provide: AddAccountRepository,
      useValue: AccountMongoRepository
    }
  ]
})
export class InfraModule {}
