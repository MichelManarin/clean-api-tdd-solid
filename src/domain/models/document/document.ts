import { AccountModel } from '../account'
import { TypeDocumentModel } from '../type-document/document-type'
import { CustomFieldDocumentModel } from './custom-field-document'

export interface DocumentModel {
  id: string
  fields?: CustomFieldDocumentModel[]
  type_document: TypeDocumentModel
  user_insert: AccountModel
  assigned: AccountModel
  external_id: string
  summary: string
  sketch: string
  conclusion: string
  instancy: string
  creation_date: Date
  external_date: Date
  capture_date: Date
}
