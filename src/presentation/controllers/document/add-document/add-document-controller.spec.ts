import { AccountModel } from '../../../../domain/models/account'
import { DocumentModel } from '../../../../domain/models/document/document'
import { AddDocument, AddDocumentModel } from '../../../../domain/usecases/add-document'
import { MissingParamError, ServerError } from '../../../errors'
import { badRequest, ok } from '../../../helpers/http/http-helper'
import { CustomFieldModel, HttpRequest, TypeDocumentModel, Validation } from '../../type-document/add-custom-field/add-custom-field-document-type-controller-protocols'
import { AddDocumentController } from './add-document-controller'

const dateMock = new Date()

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

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeFakeTypeDocument = (): TypeDocumentModel => ({
  id: 'any_id',
  name: 'any_name',
  fields: [makeFakeCustomField()]
})

const makeFakeDocument = (): DocumentModel => ({
  id: 'valid_id',
  external_id: 'external_id',
  fields: [makeFakeCustomField()],
  type_document: makeFakeTypeDocument(),
  user_insert: makeFakeAccount(),
  assigned: makeFakeAccount(),
  summary: 'any_summary',
  sketch: 'any_sketch',
  conclusion: 'any_sketch',
  instancy: 'any_instance',
  creation_date: dateMock,
  external_date: dateMock,
  capture_date: dateMock
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 'valid_id',
    external_id: 'external_id',
    fields: [makeFakeCustomField()],
    type_document: 'any_type_document',
    user_insert: 'any_user',
    assigned: 'any_user',
    summary: 'any_summary',
    sketch: 'any_sketch',
    conclusion: 'any_sketch',
    instancy: 'any_instance',
    creation_date: dateMock,
    external_date: dateMock,
    capture_date: dateMock
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddDocument = (): AddDocument => {
  class AddDocumentStub implements AddDocument {
    async add (Document: AddDocumentModel): Promise<DocumentModel> {
      const fakeDocument = makeFakeDocument()
      return new Promise(resolve => resolve(fakeDocument))
    }
  }
  return new AddDocumentStub()
}

interface SutTypes{
  sut: AddDocumentController
  addDocumentStub: AddDocument
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addDocumentStub = makeAddDocument()
  const validationStub = makeValidation()
  const sut = new AddDocumentController(addDocumentStub, validationStub)
  return {
    sut,
    addDocumentStub,
    validationStub
  }
}

describe('AddDocumentController', () => {
  test('Should return 500 if AddDocument throws', async () => {
    const { sut, addDocumentStub } = makeSut()
    jest.spyOn(addDocumentStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should call AddDocument with correct values', async () => {
    const { sut, addDocumentStub } = makeSut()
    const addSpy = jest.spyOn(addDocumentStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeDocument()))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
