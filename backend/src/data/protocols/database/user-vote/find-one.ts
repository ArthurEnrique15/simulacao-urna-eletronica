import { UserVote } from '@/domain/models/user-vote'

export namespace FindOneUserVoteRepositoryDTO {
  export type Params = Partial<UserVote>

  export type Result = UserVote | null
}

export interface IFindOneUserVoteRepository {
  findOne(params: FindOneUserVoteRepositoryDTO.Params): Promise<FindOneUserVoteRepositoryDTO.Result>
}
