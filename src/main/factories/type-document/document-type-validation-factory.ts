import { ValidationComposite, RequiredFieldValidation, ArrayNotEmptyValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'

export const makeTypeDocumentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'fields']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ArrayNotEmptyValidation('fields'))
  return new ValidationComposite(validations)
}
