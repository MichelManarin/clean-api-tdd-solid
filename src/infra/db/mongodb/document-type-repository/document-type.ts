import { AddDocumentTypeRepository } from '../../../../data/protocols/db/type-document/add-document-type-repository'
import { UpdateDocumentTypeRepository } from '../../../../data/protocols/db/type-document/update-document-type-repository'
import { AddTypeDocumentModel } from '../../../../domain/usecases/document-type/add-document-type'
import { UpdateTypeDocumentModel } from '../../../../domain/usecases/document-type/update-document-type'
import { TypeDocumentModel } from '../../../../domain/models/type-document/document-type'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectID } from 'mongodb'

export class TypeDocumentMongoRepository implements AddDocumentTypeRepository, UpdateDocumentTypeRepository {
  async add (typeDocumentData: AddTypeDocumentModel): Promise<TypeDocumentModel> {
    const typeDocumentCollection = await MongoHelper.getCollection('document_type')
    const result = await typeDocumentCollection.insertOne(typeDocumentData)
    return MongoHelper.map(result.ops[0])
  }

  async update (typeDocumentData: UpdateTypeDocumentModel): Promise<TypeDocumentModel> {
    const typeDocumentCollection = await MongoHelper.getCollection('document_type')
    const { id: _id } = typeDocumentData
    const result = await typeDocumentCollection.findOneAndUpdate(
      { _id: new ObjectID(_id) },
      { $set: { name: typeDocumentData.name } },
      { upsert: true, returnOriginal: false }
    )
    return MongoHelper.map(result.value)
  }

  async get (typeDocumentData: AddTypeDocumentModel): Promise<TypeDocumentModel> {
    const typeDocumentCollection = await MongoHelper.getCollection('document_type')
    const result = await typeDocumentCollection.insertOne(typeDocumentData)
    return MongoHelper.map(result.ops[0])
  }

  async remove (typeDocumentData: UpdateTypeDocumentModel): Promise<void> {
    const typeDocumentCollection = await MongoHelper.getCollection('document_type')
    const { id: _id } = typeDocumentData
    await typeDocumentCollection.deleteOne({ _id })
  }
}
