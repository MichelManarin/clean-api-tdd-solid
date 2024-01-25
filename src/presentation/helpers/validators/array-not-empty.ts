import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class ArrayNotEmptyValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    const field = input[this.fieldName]
    if (Array.isArray(field) && field.length === 0) {
      return new MissingParamError(this.fieldName)
    }
  }
}
