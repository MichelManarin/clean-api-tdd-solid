import { HttpResponse, HttpRequest, Controller, AddCustomField, Validation } from './add-custom-field-document-type-controller-protocols'
import { badRequest, serverError, ok } from '../../../helpers/http/http-helper'

export class AddCustomFieldController implements Controller {
  constructor (
    private readonly addCustomField: AddCustomField,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const typeDocument = await this.addCustomField.add(httpRequest.body)
      return ok(typeDocument)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
