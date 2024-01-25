import { ValidationComposite, RequiredFieldValidation } from '../../../../presentation/helpers/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeUpdateTypeDocumentController } from './update-document-type-factory'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

describe('TypeDocumentValidation Factory', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeUpdateTypeDocumentController()
    const validations: Validation[] = []
    for (const field of ['name', 'id']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
