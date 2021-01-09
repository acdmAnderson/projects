import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))
describe('Bcrypt Adapter', () => {
  const salt = 12
  test('Should calls encrypt with correct value', async () => {
    const sut = new BcryptAdapter(salt)
    const encryptSpy = jest.spyOn(sut, 'encrypt')
    await sut.encrypt('any_value')
    expect(encryptSpy).toHaveBeenCalledWith('any_value')
  })

  test('Should calls bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return hash on success', async () => {
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
