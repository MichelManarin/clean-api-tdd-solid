import { HttpResponse, HttpRequest, Controller, UpdateTypeDocument, Validation } from './update-document-type-controller-protocols'
import { badRequest, serverError, ok } from '../../../helpers/http/http-helper'

export class UpdateTypeDocumentController implements Controller {
  constructor (
    private readonly updateTypeDocument: UpdateTypeDocument,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const typeDocument = await this.updateTypeDocument.update(httpRequest.body)
      return ok(typeDocument)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
