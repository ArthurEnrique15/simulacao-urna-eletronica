import { ListCandidatesController } from '@/presentation/controllers/list-candidates'

import { makeListCandidates } from '../use-cases/list-candidates'

export function makeListCandidatesController(): ListCandidatesController {
  const listCandidatesUseCase = makeListCandidates()
  return new ListCandidatesController(listCandidatesUseCase)
}
