import { Router } from 'express'
import { makeTypeDocumentController } from '../factories/type-document/document-type-factory'
import { makeUpdateTypeDocumentController } from '../factories/type-document/update-document-type-factory/update-document-type-factory'
import { makeAddCustomFieldController } from '../factories/custom-field/add-custom-field/add-custom-field-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/type-document', adminAuth, adaptRoute(makeTypeDocumentController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.patch('/type-document', adminAuth, adaptRoute(makeUpdateTypeDocumentController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/type-document/field', adminAuth, adaptRoute(makeAddCustomFieldController()))
}
