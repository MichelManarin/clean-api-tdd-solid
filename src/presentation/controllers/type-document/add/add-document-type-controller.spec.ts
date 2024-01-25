import { AddTypeDocumentController } from './add-document-type-controller'
import { ServerError } from '../../../errors'
import { TypeDocumentModel, AddTypeDocument, AddTypeDocumentModel, Validation } from './add-document-type-controller-protocols'

const makeAddTypeDocument = (): AddTypeDocument => {
  class AddTypeDocumentStub implements AddTypeDocument {
    async add (TypeDocument: AddTypeDocumentModel): Promise<TypeDocumentModel> {
      const fakeTypeDocument = {
        id: 'valid_id',
        name: 'valid_name',
        fields: []
      }
      return new Promise(resolve => resolve(fakeTypeDocument))
    }
  }
  return new AddTypeDocumentStub()
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
  sut: AddTypeDocumentController
  addTypeDocumentStub: AddTypeDocument
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addTypeDocumentStub = makeAddTypeDocument()
  const validationStub = makeValidation()
  const sut = new AddTypeDocumentController(addTypeDocumentStub, validationStub)
  return {
    sut,
    addTypeDocumentStub,
    validationStub
  }
}

describe('Add TypeDocument Controller', () => {
  test('Should return 500 if AddTypeDocument throws', async () => {
    const { sut, addTypeDocumentStub } = makeSut()
    jest.spyOn(addTypeDocumentStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        name: 'Generic type document'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addTypeDocumentStub } = makeSut()
    const addSpy = jest.spyOn(addTypeDocumentStub, 'add')
    const httpRequest = {
      body: {
        name: 'Generic type document'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'Generic type document'
    })
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Generic type document'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      fields: []
    })
  })
})
