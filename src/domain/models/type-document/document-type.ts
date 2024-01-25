import { CustomFieldModel } from './custom-field'

export interface TypeDocumentModel {
  id: string
  name: string
  fields?: CustomFieldModel[]
}
