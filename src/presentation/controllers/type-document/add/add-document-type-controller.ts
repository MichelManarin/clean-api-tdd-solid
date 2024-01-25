import { HttpResponse, HttpRequest, Controller, AddTypeDocument, Validation } from './add-document-type-controller-protocols'
import { badRequest, serverError, ok } from '../../../helpers/http/http-helper'

export class AddTypeDocumentController implements Controller {
  constructor (
    private readonly addTypeDocument: AddTypeDocument,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name } = httpRequest.body
      const typeDocument = await this.addTypeDocument.add({
        name
      })
      return ok(typeDocument)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
