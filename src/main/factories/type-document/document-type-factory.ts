import { AddTypeDocumentController } from '../../../presentation/controllers/type-document/add/add-document-type-controller'
import { DbAddTypeDocument } from '../../../data/usecases/add-type-document/db-add-document-type'
import { TypeDocumentMongoRepository } from '../../../infra/db/mongodb/document-type-repository/document-type'
import { makeTypeDocumentValidation } from './document-type-validation-factory'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../presentation/protocols'

export const makeTypeDocumentController = (): Controller => {
  const typeDocumentMongoRepository = new TypeDocumentMongoRepository()
  const dbAddTypeDocument = new DbAddTypeDocument(typeDocumentMongoRepository)
  const typeDocumentController = new AddTypeDocumentController(dbAddTypeDocument, makeTypeDocumentValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(typeDocumentController, logMongoRepository)
}
