import { MissingFieldError } from '../error/missing-field.error'
import { SingUpResolver } from './signup'

const makeSut = (): SingUpResolver => {
  return new SingUpResolver()
}

describe('Sign Up Resolver', () => {
  test('Should return an 400 if no fistName is provided', () => {
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
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
})
