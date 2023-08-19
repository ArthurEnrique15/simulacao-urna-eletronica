import { Router } from 'express'

import { makeAddUserController } from './factories/controllers/add-user'

export function setupRoutes() {
  const router = Router()

  const addUserController = makeAddUserController()

  router.post('/user', addUserController.handle.bind(addUserController))
  return router
}
