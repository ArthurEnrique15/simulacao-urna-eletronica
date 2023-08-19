import { AddUserVoteController } from '@/presentation/controllers/add-user-vote'

import { makeAddUserVote } from '../use-cases/add-user-vote'

export function makeAddUserVoteController(): AddUserVoteController {
  const addUserVoteUseCase = makeAddUserVote()
  return new AddUserVoteController(addUserVoteUseCase)
}
