import { AddUserVoteRepositoryParams, IAddUserVoteRepository } from '@/data/protocols/database/user-vote/add-user-vote'
import { IFindAllUserVotesRepository } from '@/data/protocols/database/user-vote/find-all'
import { IFindUserVoteByUserRepository } from '@/data/protocols/database/user-vote/find-by-user'
import { UserVote } from '@/domain/models/user-vote'

import MongoHelper from '../helper'

export class UserVoteRepository
  implements IAddUserVoteRepository, IFindUserVoteByUserRepository, IFindAllUserVotesRepository
{
  async add(params: AddUserVoteRepositoryParams): Promise<boolean> {
    const usersVotesCollection = MongoHelper.getCollection('users_votes')
    const result = await usersVotesCollection.insertOne(params)
    return result.insertedId !== null
  }

  async findByUser(userId: string): Promise<UserVote | null> {
    const usersVotesCollection = MongoHelper.getCollection('users_votes')

    const userVote = await usersVotesCollection.findOne(
      { userId },
      { projection: { _id: 1, userId: 1, candidateId: 1, isBlank: 1, createdAt: 1 } },
    )

    if (!userVote) return null

    return {
      id: userVote._id.toString(),
      userId: userVote.userId,
      candidateId: userVote.candidateId,
      isBlank: userVote.isBlank,
      createdAt: userVote.createdAt,
    }
  }

  async findAll(): Promise<UserVote[]> {
    const usersVotesCollection = MongoHelper.getCollection('users_votes')
    const usersVotes = await usersVotesCollection
      .find({}, { projection: { _id: 1, userId: 1, candidateId: 1, isBlank: 1, createdAt: 1 } })
      .toArray()

    return usersVotes.map((userVote) => {
      return {
        id: userVote._id.toString(),
        userId: userVote.userId,
        candidateId: userVote.candidateId,
        isBlank: userVote.isBlank,
        createdAt: userVote.createdAt,
      }
    })
  }
}
