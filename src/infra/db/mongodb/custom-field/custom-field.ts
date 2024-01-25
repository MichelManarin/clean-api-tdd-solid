import { AddCustomFieldRepository } from '../../../../data/protocols/db/custom-field/add-custom-field-repository'
import { AddCustomFieldModel } from '../../../../domain/usecases/document-type/add-custom-field'
import { TypeDocumentModel } from '../../../../domain/models/type-document/document-type'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class CustomFieldMongoRepository implements AddCustomFieldRepository {
  async add (customFieldData: AddCustomFieldModel): Promise<TypeDocumentModel> {
    const { field, documentTypeId: _id } = customFieldData
    const documentTypeCollection = await MongoHelper.getCollection('document_type')
    const result = await documentTypeCollection.findOneAndUpdate({ _id: new ObjectId(_id) }, { $push: { fields: field } })
    return MongoHelper.map(result.value)
  }
}
