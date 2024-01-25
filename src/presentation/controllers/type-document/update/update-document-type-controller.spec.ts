import { UpdateTypeDocumentController } from './update-document-type-controller'
import { ServerError } from '../../../errors'
import { TypeDocumentModel, UpdateTypeDocument, UpdateTypeDocumentModel, Validation } from './update-document-type-controller-protocols'

const makeUpdateTypeDocument = (): UpdateTypeDocument => {
  class UpdateTypeDocumentStub implements UpdateTypeDocument {
    async update (TypeDocument: UpdateTypeDocumentModel): Promise<TypeDocumentModel> {
      const fakeTypeDocument = {
        id: 'valid_id',
        name: 'valid_name',
        fields: []
      }
      return new Promise(resolve => resolve(fakeTypeDocument))
    }
  }
  return new UpdateTypeDocumentStub()
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
  sut: UpdateTypeDocumentController
  updateTypeDocumentStub: UpdateTypeDocument
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateTypeDocumentStub = makeUpdateTypeDocument()
  const validationStub = makeValidation()
  const sut = new UpdateTypeDocumentController(updateTypeDocumentStub, validationStub)
  return {
    sut,
    updateTypeDocumentStub,
    validationStub
  }
}

describe('Update TypeDocument Controller', () => {
  test('Should return 500 if UpdateTypeDocument throws', async () => {
    const { sut, updateTypeDocumentStub } = makeSut()
    jest.spyOn(updateTypeDocumentStub, 'update').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        id: 'any_id',
        name: 'Generic type document'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should call UpdateAccount with correct values', async () => {
    const { sut, updateTypeDocumentStub } = makeSut()
    const updateSpy = jest.spyOn(updateTypeDocumentStub, 'update')
    const httpRequest = {
      body: {
        id: 'any_id',
        name: 'Generic type document'
      }
    }
    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'Generic type document'
    })
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'any_id',
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
