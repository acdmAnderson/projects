import { AddAccount, AddAccountModel, Encrypter, AccountModel, AddAccountRepository } from './db-add-account-contracts'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository) { }
  async add (account: AddAccountModel): Promise<AccountModel> {
    const password = await this.encrypter.encrypt(account.password)
    return this.addAccountRepository.add({ ...account, password })
  }
}
