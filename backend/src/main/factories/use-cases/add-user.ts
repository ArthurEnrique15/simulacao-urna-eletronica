import { AddUser } from '@/data/use-cases/add-user'

import { makeBcryptAdapter } from '../cryptography/bcrypt-adapter'
import { makeUserRepository } from '../database/mongodb/user-repository'

export function makeAddUserUseCase() {
  const userRepository = makeUserRepository()
  const passwordHasher = makeBcryptAdapter()

  return new AddUser(userRepository, passwordHasher, userRepository)
}
