import { ObjectId } from 'mongodb'

import { IFindCandidateByIdRepository } from '@/data/protocols/database/candidate/find-candidate-by-id'
import { Candidate } from '@/domain/models/candidate'

import MongoHelper from './helper'

export class CandidateRepository implements IFindCandidateByIdRepository {
  async findById(id: string): Promise<Candidate | null> {
    const candidatesCollection = MongoHelper.getCollection('candidates')

    const candidate = await candidatesCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 1, name: 1, party: 1, viceCandidate: 1, number: 1, createdAt: 1 } },
    )

    if (!candidate) return null

    return {
      id: candidate._id.toString(),
      name: candidate.name,
      party: candidate.party,
      viceCandidate: candidate.viceCandidate,
      number: candidate.number,
      createdAt: candidate.createdAt,
    }
  }
}
