import { TypeDocumentModel, AddTypeDocument, AddTypeDocumentModel, AddDocumentTypeRepository } from './db-add-document-type-protocols'

export class DbAddTypeDocument implements AddTypeDocument {
  constructor (private readonly addDocumentRepository: AddDocumentTypeRepository) { }

  async add (typeDocumentData: AddTypeDocumentModel): Promise<TypeDocumentModel> {
    const documentType = await this.addDocumentRepository.add(Object.assign({}, typeDocumentData, {}))
    return documentType
  }
}
