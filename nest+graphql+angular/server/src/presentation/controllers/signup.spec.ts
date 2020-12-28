import { EmailValidator } from '../contracts'
import { InvalidFieldError, MissingFieldError } from '../error'
import { SingUpResolver } from './signup'

interface SutTypes {
  sut: SingUpResolver
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SingUpResolver(emailValidatorStub)
  return { sut, emailValidatorStub }
}

describe('Sign Up Resolver', () => {
  test('Should return an 400 if no fistName is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        lastName: 'any_lastName',
        email: 'any_email',
        password: 'any_password',
        isActive: true
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('fistName'))
  })

  test('Should return an 400 if no lastName is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fistName: 'any_fistName',
        email: 'any_email@email.com',
        password: 'any_password',
        isActive: true
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('lastName'))
  })

  test('Should return an 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fistName: 'any_fistName',
        lastName: 'any_lastName',
        password: 'any_password',
        isActive: true
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('email'))
  })

  test('Should return an 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fistName: 'any_fistName',
        lastName: 'any_lastName',
        email: 'any_email@email.com',
        isActive: true
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('password'))
  })

  test('Should return an 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        fistName: 'any_fistName',
        lastName: 'any_lastName',
        email: 'invalid_email@email.com',
        password: 'any_password',
        isActive: true
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidFieldError('email'))
  })
})
