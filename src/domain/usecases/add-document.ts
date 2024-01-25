import { DocumentModel } from '../models/document/document'

export interface AddDocumentModel {
  name: string
  email: string
  password: string
}

export interface AddDocument {
  add (account: AddDocumentModel): Promise<DocumentModel>
}
