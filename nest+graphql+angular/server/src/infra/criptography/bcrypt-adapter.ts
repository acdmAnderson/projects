import { Encrypter } from '../../data/contracts/encrypter'

export class BcryptAdapter implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return new Promise(resolve => resolve(null))
  }
}
