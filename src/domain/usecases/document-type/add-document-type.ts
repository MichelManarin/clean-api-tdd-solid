import { TypeDocumentModel } from '../../models/type-document/document-type'

export interface AddTypeDocumentModel {
  name: string
}

export interface AddTypeDocument {
  add (typeDocument: AddTypeDocumentModel): Promise<TypeDocumentModel>
}
