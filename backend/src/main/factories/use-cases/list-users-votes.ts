import { ListUsersVotes } from '@/data/use-cases/list-users-votes'
import { IListUsersVotes } from '@/domain/use-cases/list-users-votes'

import { makeUserVoteRepository } from '../database/mongodb/user-vote-repository'

export function makeListUsersVotes(): IListUsersVotes {
  const findAllUsersVotesRepository = makeUserVoteRepository()
  return new ListUsersVotes(findAllUsersVotesRepository)
}
