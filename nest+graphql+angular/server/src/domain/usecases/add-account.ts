import { AccountModel } from '../models/account'

export interface AddAccountModel {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
