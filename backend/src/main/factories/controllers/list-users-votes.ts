import { ListUsersVotesController } from '@/presentation/controllers/list-users-votes'

import { makeListUsersVotes } from '../use-cases/list-users-votes'

export function makeListUsersVotesController(): ListUsersVotesController {
  const listUsersVotesUseCase = makeListUsersVotes()
  return new ListUsersVotesController(listUsersVotesUseCase)
}
