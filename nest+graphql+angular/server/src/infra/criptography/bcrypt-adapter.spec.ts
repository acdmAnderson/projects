import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Should calls encrypt with correct value', async () => {
    const sut = new BcryptAdapter()
    const encryptSpy = jest.spyOn(sut, 'encrypt')
    await sut.encrypt('any_value')
    expect(encryptSpy).toHaveBeenCalledWith('any_value')
  })
})
