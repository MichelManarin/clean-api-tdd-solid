import { TypeDocumentModel } from '../../models/type-document/document-type'

export interface UpdateTypeDocumentModel {
  id: string
  name: string
}

export interface UpdateTypeDocument {
  update (typeDocument: UpdateTypeDocumentModel): Promise<TypeDocumentModel>
}
