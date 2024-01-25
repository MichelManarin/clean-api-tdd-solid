import { ValidationComposite, RequiredFieldValidation, ArrayNotEmptyValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { makeTypeDocumentValidation } from './document-type-validation-factory'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('TypeDocumentValidation Factory', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeTypeDocumentValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'fields']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ArrayNotEmptyValidation('fields'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
