import { TypeDocumentModel, AddCustomField, AddCustomFieldModel, AddCustomFieldRepository } from './db-add-custom-field-protocols'

export class DbAddCustomField implements AddCustomField {
  constructor (private readonly addCustomFieldRepository: AddCustomFieldRepository) { }

  async add (customFieldData: AddCustomFieldModel): Promise<TypeDocumentModel> {
    const documentType = await this.addCustomFieldRepository.add(Object.assign({}, customFieldData, {}))
    return documentType
  }
}
