import { DbAddTypeDocument } from './db-add-document-type'
import { TypeDocumentModel, AddTypeDocument, AddTypeDocumentModel, AddDocumentTypeRepository } from './db-add-document-type-protocols'

const makeAddTypeDocumentRepository = (): AddDocumentTypeRepository => {
  class AddDocumentTypeRepositoryStub implements AddDocumentTypeRepository {
    async add (documentTypeData: AddTypeDocumentModel): Promise<TypeDocumentModel> {
      const fakeCustomField = {
        id: 'valid_id',
        name: 'valid_name',
        type: 'valid_type',
        value: 'valid_value',
        required: true,
        readonly: false,
        sensitive: false,
        seekable: false,
        hidden: false
      }

      const fakeTypeDocument = {
        id: 'valid_id',
        name: 'valid_name',
        fields: [fakeCustomField]
      }
      return new Promise(resolve => resolve(fakeTypeDocument))
    }
  }
  return new AddDocumentTypeRepositoryStub()
}

interface SutTypes {
  sut: AddTypeDocument
  addDocumentTypeRepositoryStub: AddDocumentTypeRepository
}

const makeSut = (): SutTypes => {
  const addDocumentTypeRepositoryStub = makeAddTypeDocumentRepository()
  const sut = new DbAddTypeDocument(addDocumentTypeRepositoryStub)
  return {
    sut,
    addDocumentTypeRepositoryStub
  }
}

describe('DbAddTypeDocument Usecase', () => {
  test('Should call AddDocumentTypeRepository with correct values', async () => {
    const { sut, addDocumentTypeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addDocumentTypeRepositoryStub, 'add')

    const fakeCustomFieldData = {
      id: 'valid_id',
      name: 'valid_name',
      type: 'valid_type',
      value: 'valid_value',
      required: true,
      readonly: false,
      sensitive: false,
      seekable: false,
      hidden: false
    }

    const fakeTypeDocumentData = {
      name: 'valid_name',
      fields: [fakeCustomFieldData]
    }

    await sut.add(fakeTypeDocumentData)
    expect(addSpy).toHaveBeenCalledWith(fakeTypeDocumentData)
  })

  test('Should return an type document on success', async () => {
    const { sut } = makeSut()
    const fakeCustomFieldData = {
      id: 'valid_id',
      name: 'valid_name',
      type: 'valid_type',
      value: 'valid_value',
      required: true,
      readonly: false,
      sensitive: false,
      seekable: false,
      hidden: false
    }

    const fakeTypeDocumentData = {
      name: 'valid_name',
      fields: [fakeCustomFieldData]
    }
    const account = await sut.add(fakeTypeDocumentData)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      fields: [{
        id: 'valid_id',
        name: 'valid_name',
        type: 'valid_type',
        value: 'valid_value',
        required: true,
        readonly: false,
        sensitive: false,
        seekable: false,
        hidden: false
      }]
    })
  })
})
