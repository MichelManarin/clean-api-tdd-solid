import { DbAddCustomField } from './db-add-custom-field-type'
import { TypeDocumentModel, AddCustomField, AddCustomFieldModel, AddCustomFieldRepository } from './db-add-custom-field-protocols'

const makeAddTypeDocumentRepository = (): AddCustomFieldRepository => {
  class AddCustomFieldRepositoryStub implements AddCustomFieldRepository {
    async add (documentTypeData: AddCustomFieldModel): Promise<TypeDocumentModel> {
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
  return new AddCustomFieldRepositoryStub()
}

interface SutTypes {
  sut: AddCustomField
  addCustomFieldRepositoryStub: AddCustomFieldRepository
}

const makeSut = (): SutTypes => {
  const addCustomFieldRepositoryStub = makeAddTypeDocumentRepository()
  const sut = new DbAddCustomField(addCustomFieldRepositoryStub)
  return {
    sut,
    addCustomFieldRepositoryStub
  }
}

describe('DbAddCustomField Usecase', () => {
  test('Should call AddCustomFieldRepository with correct values', async () => {
    const { sut, addCustomFieldRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCustomFieldRepositoryStub, 'add')

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

    const fakeAddCustomFieldData = {
      documentTypeId: 'any_id',
      field: [fakeCustomFieldData]
    }

    await sut.add(fakeAddCustomFieldData)
    expect(addSpy).toHaveBeenCalledWith(fakeAddCustomFieldData)
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

    const fakeAddCustomFieldData = {
      documentTypeId: 'any_id',
      field: [fakeCustomFieldData]
    }
    const account = await sut.add(fakeAddCustomFieldData)
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
