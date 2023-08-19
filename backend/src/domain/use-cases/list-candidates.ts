import { Candidate } from '../models/candidate'

export interface IListCandidates {
  list(): Promise<Candidate[]>
}
