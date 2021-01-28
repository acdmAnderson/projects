import { EmailValidator } from '../presentation/contracts/email-validator'
import validator from 'validator'
import { Injectable } from '@nestjs/common'
@Injectable()
export class EmailValidatorAdapter extends EmailValidator {
  constructor () {
    super()
  }

  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
