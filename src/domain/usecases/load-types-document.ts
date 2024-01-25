import { TypeDocumentModel } from '../models/type-document/document-type'

export interface LoadTypesDocument {
  loadTypesDocument: () => Promise<TypeDocumentModel[]>
}
