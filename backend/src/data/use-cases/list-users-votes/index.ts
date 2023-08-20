import { IFindAllUserVotesRepository } from '@/data/protocols/database/user-vote/find-all'
import { UserVote } from '@/domain/models/user-vote'
import { IListUsersVotes } from '@/domain/use-cases/list-users-votes'

export class ListUsersVotes implements IListUsersVotes {
  constructor(private readonly findAllUsersVotesRepository: IFindAllUserVotesRepository) {}

  async list(): Promise<UserVote[]> {
    return this.findAllUsersVotesRepository.findAll()
  }
}
