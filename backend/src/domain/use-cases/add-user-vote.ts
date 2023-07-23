import { UserVote } from '../models/user-vote'

export namespace AddUserVoteDTO {
  export type Params = {
    userId: string
    candidateId: string
  }

  export type Result = UserVote
}

export interface IAddUserVote {
  add(params: AddUserVoteDTO.Params): Promise<AddUserVoteDTO.Result>
}
