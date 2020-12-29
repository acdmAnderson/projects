import { InvalidFieldError, MissingFieldError, ServerError } from '../../error'
import { SingUpResolver } from './signup'
import { AccountModel, AddAccount, EmailValidator, AddAccountModel } from './signup-contracts'

interface SutTypes {
  sut: SingUpResolver
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 1,
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email@email.com',
        password: 'valid_password',
        isActive: true
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SingUpResolver(emailValidatorStub, addAccountStub)
  return { sut, emailValidatorStub, addAccountStub }
}

describe('Sign Up Resolver', () => {
  test('Should return an 400 if no firstName is provided', () => {
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
    expect(httpResponse.body).toEqual(new MissingFieldError('firstName'))
  })

  test('Should return an 400 if no lastName is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        firstName: 'any_firstName',
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
        firstName: 'any_firstName',
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
        firstName: 'any_firstName',
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
        firstName: 'any_firstName',
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
        firstName: 'any_firstName',
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
        firstName: 'any_firstName',
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

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = {
      body: {
        firstName: 'any_firstName',
        lastName: 'any_lastName',
        email: 'any_email@email.com',
        password: 'any_password',
        isActive: true
      }
    }
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      firstName: 'any_firstName',
      lastName: 'any_lastName',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('Should return an 500 if AddAccount throws', () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        firstName: 'any_firstName',
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
