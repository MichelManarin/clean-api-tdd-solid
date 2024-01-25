import { ValidationComposite, RequiredFieldValidation } from '../../../../presentation/helpers/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeUpdateTypeDocumentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
