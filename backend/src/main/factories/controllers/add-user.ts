import { AddUserController } from '@/presentation/controllers/add-user'

import { makeAddUserUseCase } from '../use-cases/add-user'

export function makeAddUserController() {
  const addUserUseCase = makeAddUserUseCase()
  return new AddUserController(addUserUseCase)
}
