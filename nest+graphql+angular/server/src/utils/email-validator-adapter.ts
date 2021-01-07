import { EmailValidator } from '../presentation/contracts/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
