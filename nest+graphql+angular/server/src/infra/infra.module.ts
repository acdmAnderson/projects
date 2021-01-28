import { Module } from '@nestjs/common'
import { DataModule } from '../data/data.module'
import { AddAccountRepository } from '../data/contracts/add-account-repository'
import { AccountMongoRepository } from './db/mongodb/account-repository/account'
import { Encrypter } from '../data/contracts/encrypter'
import { BcryptAdapter } from './criptography/bcrypt-adapter'
@Module({
  imports: [DataModule],
  providers: [
    {
      provide: AddAccountRepository,
      useClass: AccountMongoRepository
    },
    {
      provide: Encrypter,
      useClass: BcryptAdapter
    }
  ]
})
export class InfraModule {}
