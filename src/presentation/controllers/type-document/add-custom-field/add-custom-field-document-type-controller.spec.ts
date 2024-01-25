import { AddCustomFieldController } from './add-custom-field-controller'
import { ServerError } from '../../../errors'
import { TypeDocumentModel, AddCustomField, AddCustomFieldModel, Validation, CustomFieldModel } from './add-custom-field-document-type-controller-protocols'

const makeFakeCustomField = (): CustomFieldModel => ({
  id: 'valid_id',
  name: 'valid_name',
  type: 'valid_type',
  value: 'valid_value',
  required: true,
  readonly: false,
  sensitive: false,
  seekable: false,
  hidden: false
})

const makeAddCustomField = (): AddCustomField => {
  class AddCustomFieldStub implements AddCustomField {
    async add (TypeDocument: AddCustomFieldModel): Promise<TypeDocumentModel> {
      const fakeTypeDocument = {
        id: 'valid_id',
        name: 'valid_name',
        fields: [makeFakeCustomField()]
      }
      return new Promise(resolve => resolve(fakeTypeDocument))
    }
  }
  return new AddCustomFieldStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: AddCustomFieldController
  addCustomFieldStub: AddCustomField
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addCustomFieldStub = makeAddCustomField()
  const validationStub = makeValidation()
  const sut = new AddCustomFieldController(addCustomFieldStub, validationStub)
  return {
    sut,
    addCustomFieldStub,
    validationStub
  }
}

describe('Add CustomField Controller', () => {
  test('Should return 500 if AddCustomField throws', async () => {
    const { sut, addCustomFieldStub } = makeSut()
    jest.spyOn(addCustomFieldStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        id: 'any_id',
        fields: [makeFakeCustomField()]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should call AddCustomField with correct values', async () => {
    const { sut, addCustomFieldStub } = makeSut()
    const addSpy = jest.spyOn(addCustomFieldStub, 'add')
    const httpRequest = {
      body: {
        id: 'any_id',
        field: [makeFakeCustomField()]
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      id: 'any_id',
      field: [makeFakeCustomField()]
    })
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'any_id',
        fields: [makeFakeCustomField()]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      fields: [makeFakeCustomField()]
    })
  })
})
