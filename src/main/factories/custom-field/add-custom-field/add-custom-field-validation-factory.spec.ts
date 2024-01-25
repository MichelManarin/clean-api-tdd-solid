import { ValidationComposite, RequiredFieldValidation } from '../../../../presentation/helpers/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeAddCustomFieldValidation } from './add-custom-field-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

describe('AddCustomFieldValidation Factory', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeAddCustomFieldValidation()
    const validations: Validation[] = []
    for (const field of ['field', 'documentTypeId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
