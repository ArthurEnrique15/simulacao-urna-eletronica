import { IFindAllCandidatesRepository } from '@/data/protocols/database/candidate/find-all'
import { Candidate } from '@/domain/models/candidate'
import { IListCandidates } from '@/domain/use-cases/list-candidates'

export class ListCandidates implements IListCandidates {
  constructor(private readonly findAllCandidatesRepository: IFindAllCandidatesRepository) {}

  async list(): Promise<Candidate[]> {
    return this.findAllCandidatesRepository.findAll()
  }
}
