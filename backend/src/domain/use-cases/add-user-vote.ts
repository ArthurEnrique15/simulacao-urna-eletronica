export namespace AddUserVoteDTO {
  export type Params = {
    token: string
    candidateId: string
  }

  export type Result = boolean
}

export interface IAddUserVote {
  add(params: AddUserVoteDTO.Params): Promise<AddUserVoteDTO.Result>
}
