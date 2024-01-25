import { HttpResponse, HttpRequest, Controller, Validation } from './add-document-controller-protocols'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { AddDocument } from '../../../../domain/usecases/add-document'

export class AddDocumentController implements Controller {
  constructor (
    private readonly addDocument: AddDocument,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const document = await this.addDocument.add(httpRequest.body)
      return ok(document)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
