import { AccountModel } from '../models/account'

export interface AddAccountModel {
  firstName: string
  lastName: string
  email: string
  password: string
}

export abstract class AddAccount {
  abstract add (account: AddAccountModel): Promise<AccountModel>
}
