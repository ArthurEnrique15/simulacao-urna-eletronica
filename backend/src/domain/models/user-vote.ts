export type UserVote = {
  id: string
  userId: string
  candidateId: string | null
  isBlank: boolean
  createdAt: Date
}
