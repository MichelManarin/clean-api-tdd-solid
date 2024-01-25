import { AddCustomFieldController } from '../../../../presentation/controllers/type-document/add-custom-field/add-custom-field-controller'
import { DbAddCustomField } from '../../../../data/usecases/add-custom-field/db-add-custom-field-type'
import { CustomFieldMongoRepository } from '../../../../infra/db/mongodb/custom-field/custom-field'
import { makeAddCustomFieldValidation } from './add-custom-field-validation-factory'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../../presentation/protocols'

export const makeAddCustomFieldController = (): Controller => {
  const customFieldMongoRepository = new CustomFieldMongoRepository()
  const dbAddCustomField = new DbAddCustomField(customFieldMongoRepository)
  const addFieldController = new AddCustomFieldController(dbAddCustomField, makeAddCustomFieldValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(addFieldController, logMongoRepository)
}
