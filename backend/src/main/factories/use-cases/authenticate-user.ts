import { AuthenticateUser } from '@/data/use-cases/authenticate-user'
import { IAuthenticateUser } from '@/domain/use-cases/authenticate-user'

import { makeBcryptAdapter } from '../cryptography/bcrypt-adapter'
import { makeJwtAdapter } from '../cryptography/jwt-adapter'
import { makeUserRepository } from '../database/mongodb/user-repository'
import { makeUserVoteRepository } from '../database/mongodb/user-vote-repository'

export function makeAuthenticateUser(): IAuthenticateUser {
  const findUserByEmailRepository = makeUserRepository()
  const hashComparer = makeBcryptAdapter()
  const encrypter = makeJwtAdapter()
  const userVoteRepository = makeUserVoteRepository()

  return new AuthenticateUser(findUserByEmailRepository, hashComparer, encrypter, userVoteRepository)
}
