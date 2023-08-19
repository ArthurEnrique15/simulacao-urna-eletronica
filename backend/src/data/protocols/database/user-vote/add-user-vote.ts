export type AddUserVoteRepositoryParams = {
  userId: string
  candidateId: string
}

export interface IAddUserVoteRepository {
  add(params: AddUserVoteRepositoryParams): Promise<boolean>
}
