import { TypeDocumentModel, UpdateDocumentTypeRepository, UpdateTypeDocument, UpdateTypeDocumentModel } from './db-update-document-type-protocols'

export class DbUpdateTypeDocument implements UpdateTypeDocument {
  constructor (
    private readonly updateDocumentRepository: UpdateDocumentTypeRepository
  ) { }

  async update (typeDocumentData: UpdateTypeDocumentModel): Promise<TypeDocumentModel> {
    const documentType = await this.updateDocumentRepository.update(Object.assign({}, typeDocumentData, {}))
    return documentType
  }
}
