import { AuthenticateUserController } from '@/presentation/controllers/authenticate-user'

import { makeAuthenticateUser } from '../use-cases/authenticate-user'

export function makeAuthenticateUserController(): AuthenticateUserController {
  const authenticateUserUseCase = makeAuthenticateUser()
  return new AuthenticateUserController(authenticateUserUseCase)
}
