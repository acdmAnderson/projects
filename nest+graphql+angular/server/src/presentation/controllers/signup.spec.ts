import { EmailValidator } from '../contracts'
import { InvalidFieldError, MissingFieldError, ServerError } from '../error'
import { SingUpResolver } from './signup'

interface SutTypes {
  sut: SingUpResolver
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
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

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        fistName: 'any_fistName',
        lastName: 'any_lastName',
        email: 'any_email@email.com',
        password: 'any_password',
        isActive: true
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return an 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        fistName: 'any_fistName',
        lastName: 'any_lastName',
        email: 'any_email@email.com',
        password: 'any_password',
        isActive: true
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
