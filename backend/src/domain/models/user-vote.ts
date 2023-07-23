import { Candidate } from './candidate'
import { User } from './user'

export type UserVote = {
  id: string
  user: User
  candidate: Candidate
  date: Date
}
