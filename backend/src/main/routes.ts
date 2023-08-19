import { Router } from 'express'

import { makeAddUserController } from './factories/controllers/add-user'
import { makeAuthenticateUserController } from './factories/controllers/authenticate-user'

export function setupRoutes() {
  const router = Router()

  const addUserController = makeAddUserController()
  const authenticateUserController = makeAuthenticateUserController()

  router.post('/user', addUserController.handle.bind(addUserController))
  router.post('/login', authenticateUserController.handle.bind(authenticateUserController))
  return router
}
