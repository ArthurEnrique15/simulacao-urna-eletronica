import { UserVote } from '@/domain/models/user-vote'

export interface IFindAllUserVotesRepository {
  findAll(): Promise<UserVote[]>
}
