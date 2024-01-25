import { CustomFieldModel } from '../../../../domain/models/type-document/custom-field'
import { TypeDocumentModel } from '../../../../domain/models/type-document/document-type'
import { MongoHelper } from '../helpers/mongo-helper'
import { TypeDocumentMongoRepository } from './document-type'

const makeCustomField = (): CustomFieldModel => ({
  id: 'any_id',
  name: 'any_name',
  type: 'any_type',
  value: 'any_value',
  required: true,
  readonly: false,
  sensitive: false,
  seekable: false,
  hidden: false
})

const makeFakeTypeDocument = (): TypeDocumentModel => ({
  id: 'any_id',
  name: 'any_name',
  fields: [makeCustomField()]
})

describe('TypeDocument Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): TypeDocumentMongoRepository => {
    return new TypeDocumentMongoRepository()
  }

  test('Should return an type document on success add', async () => {
    const sut = makeSut()
    const typeDocument = await sut.add(makeFakeTypeDocument())
    expect(typeDocument).toBeTruthy()
    expect(typeDocument.id).toBeTruthy()
    expect(typeDocument.name).toBe('any_name')
    expect(typeDocument.fields).toBeTruthy()
  })

  test('Should return an type document updated on update success', async () => {
    const sut = makeSut()
    const newType = await sut.add(makeFakeTypeDocument())
    const updatedType = await sut.update({
      id: newType.id,
      name: 'updated_name'
    })
    expect(updatedType).toBeTruthy()
    expect(updatedType.id).toBeTruthy()
    expect(updatedType.name).toBe('updated_name')
  })
})
