import { CandidateRepository } from '@/infra/database/mongodb/candidate-repository'

export function makeCandidateRepository(): CandidateRepository {
  return new CandidateRepository()
}
