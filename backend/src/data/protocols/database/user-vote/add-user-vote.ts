import { UserVote } from '@/domain/models/user-vote'

export namespace AddUserVoteRepositoryDTO {
  export type Params = {
    userId: string
    candidateId: string
  }

  export type Result = UserVote
}

export interface IAddUserVoteRepository {
  add(params: AddUserVoteRepositoryDTO.Params): Promise<AddUserVoteRepositoryDTO.Result>
}
