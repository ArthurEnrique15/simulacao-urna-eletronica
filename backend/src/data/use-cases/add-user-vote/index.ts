import { IDecrypter } from '@/data/protocols/cryptography/decrypter'
import { IFindCandidateByIdRepository } from '@/data/protocols/database/candidate/find-candidate-by-id'
import { IFindUserByIdRepository } from '@/data/protocols/database/user/find-user-by-id'
import { IAddUserVoteRepository } from '@/data/protocols/database/user-vote/add-user-vote'
import { IFindUserVoteByUserRepository } from '@/data/protocols/database/user-vote/find-by-user'
import { AddUserVoteDTO, IAddUserVote } from '@/domain/use-cases/add-user-vote'

export class AddUserVote implements IAddUserVote {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly findCandidateByIdRepository: IFindCandidateByIdRepository,
    private readonly findUserVoteByUserRepository: IFindUserVoteByUserRepository,
    private readonly addUserVoteRepository: IAddUserVoteRepository,
  ) {}

  async add({ token, candidateId }: AddUserVoteDTO.Params): Promise<AddUserVoteDTO.Result> {
    const { userId } = await this.decrypter.decrypt(token)

    const userExists = await this.findUserByIdRepository.findById(userId)

    if (!userExists) {
      throw new Error('User not found')
    }

    const candidateExists = await this.findCandidateByIdRepository.findById(candidateId)

    if (!candidateExists) {
      throw new Error('Candidate not found')
    }

    const userAlreadyVoted = await this.findUserVoteByUserRepository.findByUser(userId)

    if (userAlreadyVoted) {
      throw new Error('User already voted')
    }

    const userVote = await this.addUserVoteRepository.add({ userId, candidateId })

    return userVote
  }
}
