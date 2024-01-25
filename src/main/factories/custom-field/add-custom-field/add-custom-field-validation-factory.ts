import { ValidationComposite, RequiredFieldValidation } from '../../../../presentation/helpers/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeAddCustomFieldValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['field', 'documentTypeId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
