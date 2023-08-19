import { UserVoteRepository } from '@/infra/database/mongodb/user-vote-repository'

export function makeUserVoteRepository(): UserVoteRepository {
  return new UserVoteRepository()
}
