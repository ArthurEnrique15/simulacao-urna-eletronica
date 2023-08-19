import { AddUserVote } from '@/data/use-cases/add-user-vote'
import { IAddUserVote } from '@/domain/use-cases/add-user-vote'

import { makeJwtAdapter } from '../cryptography/jwt-adapter'
import { makeCandidateRepository } from '../database/mongodb/candidate-repository'
import { makeUserRepository } from '../database/mongodb/user-repository'
import { makeUserVoteRepository } from '../database/mongodb/user-vote-repository'

export function makeAddUserVote(): IAddUserVote {
  const jwtAdapter = makeJwtAdapter()
  const findUserByIdRepository = makeUserRepository()
  const findCandidateByIdRepository = makeCandidateRepository()
  const userVoteRepository = makeUserVoteRepository()

  return new AddUserVote(
    jwtAdapter,
    findUserByIdRepository,
    findCandidateByIdRepository,
    userVoteRepository,
    userVoteRepository,
  )
}
