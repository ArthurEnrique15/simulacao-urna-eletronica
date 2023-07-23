import { IFindCandidateByIdRepository } from '@/data/protocols/database/candidate/find-candidate-by-id'
import { IFindUserByIdRepository } from '@/data/protocols/database/user/find-user-by-id'
import { IAddUserVoteRepository } from '@/data/protocols/database/user-vote/add-user-vote'
import { AddUserVoteDTO, IAddUserVote } from '@/domain/use-cases/add-user-vote'

export class AddUserVote implements IAddUserVote {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly findCandidateByIdRepository: IFindCandidateByIdRepository,
    private readonly addUserVoteRepository: IAddUserVoteRepository,
  ) {}

  async add({ userId, candidateId }: AddUserVoteDTO.Params): Promise<AddUserVoteDTO.Result> {
    const userExists = await this.findUserByIdRepository.findById(userId)

    if (!userExists) {
      throw new Error('User not found')
    }

    const candidateExists = await this.findCandidateByIdRepository.findById(candidateId)

    if (!candidateExists) {
      throw new Error('Candidate not found')
    }

    const userVote = await this.addUserVoteRepository.add({ userId, candidateId })

    return userVote
  }
}
