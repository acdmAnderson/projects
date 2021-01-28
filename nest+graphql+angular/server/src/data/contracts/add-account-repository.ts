import { AddAccountModel } from '../../domain/usecases/add-account'
import { AccountModel } from '../../domain/models/account'

export abstract class AddAccountRepository {
  abstract add (accountData: AddAccountModel): Promise<AccountModel>
}
