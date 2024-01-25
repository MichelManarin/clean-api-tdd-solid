import { UpdateTypeDocumentModel } from '../../../../domain/usecases/document-type/update-document-type'
import { TypeDocumentModel } from '../../../../domain/models/type-document/document-type'

export interface UpdateDocumentTypeRepository {
  update (typeDocumentData: UpdateTypeDocumentModel): Promise<TypeDocumentModel>
}
