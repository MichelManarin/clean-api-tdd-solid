import { UpdateTypeDocumentController } from '../../../../presentation/controllers/type-document/update/update-document-type-controller'
import { DbUpdateTypeDocument } from '../../../../data/usecases/update-type-document/db-update-document-type'
import { TypeDocumentMongoRepository } from '../../../../infra/db/mongodb/document-type-repository/document-type'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../../presentation/protocols'
import { makeUpdateTypeDocumentValidation } from './update-document-type-validation-factory'

export const makeUpdateTypeDocumentController = (): Controller => {
  const typeDocumentMongoRepository = new TypeDocumentMongoRepository()
  const dbAddTypeDocument = new DbUpdateTypeDocument(typeDocumentMongoRepository)
  const typeDocumentController = new UpdateTypeDocumentController(dbAddTypeDocument, makeUpdateTypeDocumentValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(typeDocumentController, logMongoRepository)
}
