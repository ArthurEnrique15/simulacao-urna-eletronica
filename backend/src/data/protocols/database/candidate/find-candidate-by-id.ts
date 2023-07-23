import { Candidate } from '@/domain/models/candidate'

export interface IFindCandidateByIdRepository {
  findById(id: string): Promise<Candidate | null>
}
