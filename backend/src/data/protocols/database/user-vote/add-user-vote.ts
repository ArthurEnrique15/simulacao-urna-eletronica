export type AddUserVoteRepositoryParams = {
  userId: string
  candidateId: string | null
  isBlank: boolean
  createdAt: Date
}

export interface IAddUserVoteRepository {
  add(params: AddUserVoteRepositoryParams): Promise<boolean>
}
