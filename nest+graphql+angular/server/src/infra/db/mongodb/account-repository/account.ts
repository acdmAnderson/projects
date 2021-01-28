import { Injectable } from '@nestjs/common'
import { AddAccountRepository } from '../../../../data/contracts/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo.helper'
@Injectable()
export class AccountMongoRepository extends AddAccountRepository {
  constructor () {
    super()
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }
}
