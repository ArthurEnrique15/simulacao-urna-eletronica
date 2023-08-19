import { UserVote } from '@/domain/models/user-vote'

export interface IFindUserVoteByUserRepository {
  findByUser(userId: string): Promise<UserVote | null>
}
