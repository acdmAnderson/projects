import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

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
})
