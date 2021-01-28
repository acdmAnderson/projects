import { Encrypter } from '../../data/contracts/encrypter'
import bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
@Injectable()
export class BcryptAdapter extends Encrypter {
  private readonly salt: number
  constructor (salt: number) {
    super()
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
