import { Router } from 'express'

import { makeAddUserController } from './factories/controllers/add-user'
import { makeAddUserVoteController } from './factories/controllers/add-user-vote'
import { makeAuthenticateUserController } from './factories/controllers/authenticate-user'

export function setupRoutes() {
  const router = Router()

  const addUserController = makeAddUserController()
  const authenticateUserController = makeAuthenticateUserController()
  const addUserVoteController = makeAddUserVoteController()

  router.post('/user', addUserController.handle.bind(addUserController))
  router.post('/login', authenticateUserController.handle.bind(authenticateUserController))
  router.post('/vote', addUserVoteController.handle.bind(addUserVoteController))
  return router
}
