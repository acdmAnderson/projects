import { Injectable } from '@nestjs/common'
import { AddAccount, AddAccountModel, Encrypter, AccountModel, AddAccountRepository } from './db-add-account-contracts'
@Injectable()
export class DbAddAccount extends AddAccount {
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository) {
    super()
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const password = await this.encrypter.encrypt(account.password)
    return this.addAccountRepository.add({ ...account, password })
  }
}
