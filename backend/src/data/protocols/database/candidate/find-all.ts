import { Candidate } from '@/domain/models/candidate'

export interface IFindAllCandidatesRepository {
  findAll(): Promise<Candidate[]>
}
