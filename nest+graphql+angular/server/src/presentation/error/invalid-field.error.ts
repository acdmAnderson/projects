export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`Field ${fieldName} should be valid`)
    this.name = 'InvalidFieldError'
  }
}
