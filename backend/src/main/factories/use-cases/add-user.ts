import { AddUser } from '@/data/use-cases/add-user'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

import { makeUserRepository } from '../database/mongodb/user-repository'

export function makeAddUserUseCase() {
  const userRepository = makeUserRepository()
  const passwordHasher = new BcryptAdapter(12)

  return new AddUser(userRepository, passwordHasher, userRepository)
}
