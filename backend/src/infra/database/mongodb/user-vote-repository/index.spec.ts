import { ObjectId } from 'mongodb'

import MongoHelper from '../helper'
import { UserVoteRepository } from '.'

jest.mock('mongodb', () => {
  return {
    ObjectId: jest.fn(),
  }
})
jest.mock('../helper')

describe('UserVoteRepository', () => {
  let sut: UserVoteRepository

  const mockedUserVote = {
    _id: new ObjectId('some-id'),
    userId: 'user_id',
    candidateId: 'candidate_id',
    isBlank: false,
    createdAt: new Date(),
  }

  const validInsertResponse = {
    insertedId: 'some-id',
  }

  const mockFindResponse = {
    toArray: jest.fn().mockReturnValue([mockedUserVote]),
  }

  const mockCollection = {
    insertOne: jest.fn().mockReturnValue(validInsertResponse),
    findOne: jest.fn().mockReturnValue(mockedUserVote),
    find: jest.fn().mockReturnValue(mockFindResponse),
  }

  beforeEach(() => {
    sut = new UserVoteRepository()
    MongoHelper.getCollection = jest.fn().mockReturnValue(mockCollection)
  })

  describe('add', () => {
    const validAddParams = {
      userId: 'user_id',
      candidateId: 'candidate_id',
      isBlank: false,
      createdAt: new Date(),
    }

    it('should call MongoHelper.getConnection with correct value', async () => {
      await sut.add(validAddParams)
      expect(MongoHelper.getCollection).toHaveBeenCalledWith('users_votes')
    })

    it('should return true if user vote was inserted', async () => {
      const result = await sut.add(validAddParams)
      expect(result).toEqual(true)
    })

    it('should return false if user vote was not inserted', async () => {
      const mockCollectionWithNullInsertOne = {
        insertOne: jest.fn().mockReturnValueOnce({ insertedId: null }),
      }

      MongoHelper.getCollection = jest.fn().mockReturnValueOnce(mockCollectionWithNullInsertOne)
      const result = await sut.add(validAddParams)
      expect(result).toEqual(false)
    })
  })

  describe('findByUser', () => {
    const validUserIdParam = 'any_user_id'

    it('should call MongoHelper.getConnection with correct value', async () => {
      await sut.findByUser(validUserIdParam)
      expect(MongoHelper.getCollection).toHaveBeenCalledWith('users_votes')
    })

    it('should call usersVotesCollection.findOne with correct values', async () => {
      await sut.findByUser(validUserIdParam)
      expect(mockCollection.findOne).toHaveBeenCalledTimes(1)
      expect(mockCollection.findOne).toHaveBeenCalledWith(
        { userId: validUserIdParam },
        { projection: { _id: 1, userId: 1, candidateId: 1, isBlank: 1, createdAt: 1 } },
      )
    })

    it('should return null if usersVotesCollection.findOne returns null', async () => {
      const mockCollectionWithNullFindOne = {
        findOne: jest.fn().mockReturnValueOnce(null),
      }

      MongoHelper.getCollection = jest.fn().mockReturnValue(mockCollectionWithNullFindOne)

      const response = await sut.findByUser('some-id')

      expect(response).toEqual(null)
    })

    it('should return correct user on success', async () => {
      const response = await sut.findByUser('some-id')
      expect(response).toEqual({
        id: mockedUserVote._id.toString(),
        userId: mockedUserVote.userId,
        candidateId: mockedUserVote.candidateId,
        isBlank: mockedUserVote.isBlank,
        createdAt: mockedUserVote.createdAt,
      })
    })
  })

  describe('findAll', () => {
    it('should call MongoHelper.getConnection with correct value', async () => {
      await sut.findAll()
      expect(MongoHelper.getCollection).toHaveBeenCalledWith('users_votes')
    })

    it('should call usersVotesCollection.find with correct values', async () => {
      await sut.findAll()

      expect(mockCollection.find).toHaveBeenCalledTimes(1)
      expect(mockCollection.find).toHaveBeenCalledWith(
        {},
        { projection: { _id: 1, userId: 1, candidateId: 1, isBlank: 1, createdAt: 1 } },
      )
    })

    it('should call usersVotesCollection.find.toArray', async () => {
      await sut.findAll()

      expect(mockFindResponse.toArray).toHaveBeenCalledTimes(1)
      expect(mockFindResponse.toArray).toHaveBeenCalledWith()
    })

    it('should return correct values on success', async () => {
      const result = await sut.findAll()

      expect(result).toEqual([
        {
          id: mockedUserVote._id.toString(),
          userId: mockedUserVote.userId,
          candidateId: mockedUserVote.candidateId,
          isBlank: mockedUserVote.isBlank,
          createdAt: mockedUserVote.createdAt,
        },
      ])
    })
  })
})
