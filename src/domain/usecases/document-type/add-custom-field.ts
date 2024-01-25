import { CustomFieldModel } from '../../models/type-document/custom-field'
import { TypeDocumentModel } from '../../models/type-document/document-type'

export interface AddCustomFieldModel {
  documentTypeId: string
  field: CustomFieldModel[]
}

export interface AddCustomField {
  add (customField: AddCustomFieldModel): Promise<TypeDocumentModel>
}
