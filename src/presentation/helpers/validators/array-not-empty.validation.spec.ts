import { MissingParamError } from '../../errors'
import { ArrayNotEmptyValidation } from './array-not-empty'
const makeSut = (): ArrayNotEmptyValidation => {
  return new ArrayNotEmptyValidation('field')
}
describe('ArrayNotEmptyValidation Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: [] })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: [1] })
    expect(error).toBeFalsy()
  })
})
