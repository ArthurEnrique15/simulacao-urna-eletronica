import { UserRepository } from '@/infra/database/mongodb/user-repository'

export function makeUserRepository() {
  return new UserRepository()
}
