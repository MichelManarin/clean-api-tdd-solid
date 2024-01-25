import { AddTypeDocumentModel } from '../../../../domain/usecases/document-type/add-document-type'
import { TypeDocumentModel } from '../../../../domain/models/type-document/document-type'

export interface AddDocumentTypeRepository {
  add (typeDocumentData: AddTypeDocumentModel): Promise<TypeDocumentModel>
}
