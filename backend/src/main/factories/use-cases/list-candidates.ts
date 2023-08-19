import { ListCandidates } from '@/data/use-cases/list-candidates'
import { IListCandidates } from '@/domain/use-cases/list-candidates'

import { makeCandidateRepository } from '../database/mongodb/candidate-repository'

export function makeListCandidates(): IListCandidates {
  const findAllCandidatesRepository = makeCandidateRepository()
  return new ListCandidates(findAllCandidatesRepository)
}
