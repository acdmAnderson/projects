import { MongoHelper } from '../helpers/mongo.helper'
import { AccountMongoRepository } from './account'
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    await MongoHelper.getCollection('account').deleteMany({})
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      firstName: 'any_firstName',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.firstName).toBe('any_firstName')
    expect(account.lastName).toBe('any_lastName')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})