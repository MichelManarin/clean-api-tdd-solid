import { AddCustomFieldModel } from '../../../../domain/usecases/document-type/add-custom-field'
import { TypeDocumentModel } from '../../../../domain/models/type-document/document-type'

export interface AddCustomFieldRepository {
  add (customFieldData: AddCustomFieldModel): Promise<TypeDocumentModel>
}
