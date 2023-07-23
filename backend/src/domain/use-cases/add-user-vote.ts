export namespace AddUserVoteDTO {
  export type Params = {
    userId: string
    candidateId: string
  }

  export type Result = boolean
}

export interface IAddUserVote {
  add(params: AddUserVoteDTO.Result): Promise<AddUserVoteDTO.Result>
}
