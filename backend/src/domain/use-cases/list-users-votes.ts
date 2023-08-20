import { UserVote } from '../models/user-vote'

export interface IListUsersVotes {
  list(): Promise<UserVote[]>
}
