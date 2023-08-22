import { ObjectId } from 'mongodb'

import MongoHelper from '../helper'
import { CandidateRepository } from '.'

jest.mock('mongodb', () => {
  return {
    ObjectId: jest.fn(),
  }
})
jest.mock('../helper')

describe('CandidateRepository', () => {
  let sut: CandidateRepository

  const mockedCandidate = {
    _id: new ObjectId('some-id'),
    name: '',
    party: '',
    viceCandidate: '',
    number: '',
    createdAt: new Date(),
  }

  const mockFindResponse = {
    toArray: jest.fn().mockReturnValue([mockedCandidate]),
  }

  const mockCollection = {
    findOne: jest.fn().mockReturnValue(mockedCandidate),
    find: jest.fn().mockReturnValue(mockFindResponse),
  }

  beforeEach(() => {
    sut = new CandidateRepository()
    MongoHelper.getCollection = jest.fn().mockReturnValue(mockCollection)
  })

  describe('findById', () => {
    it('should call MongoHelper.getConnection with correct value', async () => {
      await sut.findById('some-id')
      expect(MongoHelper.getCollection).toHaveBeenCalledWith('candidates')
    })

    it('should call candidatesCollection.findOne with correct values', async () => {
      await sut.findById('some-id')
      expect(mockCollection.findOne).toHaveBeenCalledTimes(1)
      expect(mockCollection.findOne).toHaveBeenCalledWith(
        { _id: new ObjectId('some-id') },
        { projection: { _id: 1, name: 1, party: 1, viceCandidate: 1, number: 1, createdAt: 1 } },
      )
    })

    it('should return null if candidatesCollection.findOne returns null', async () => {
      const mockCollectionWithNullFindOne = {
        findOne: jest.fn().mockReturnValueOnce(null),
      }

      MongoHelper.getCollection = jest.fn().mockReturnValue(mockCollectionWithNullFindOne)

      const response = await sut.findById('some-id')

      expect(response).toEqual(null)
    })

    it('should return correct candidate on success', async () => {
      const response = await sut.findById('some-id')
      expect(response).toEqual({
        id: mockedCandidate._id.toString(),
        name: mockedCandidate.name,
        party: mockedCandidate.party,
        viceCandidate: mockedCandidate.viceCandidate,
        number: mockedCandidate.number,
        createdAt: mockedCandidate.createdAt,
      })
    })
  })

  describe('findAll', () => {
    it('should call MongoHelper.getConnection with correct value', async () => {
      await sut.findAll()
      expect(MongoHelper.getCollection).toHaveBeenCalledWith('candidates')
    })

    it('should call candidatesCollection.find with correct values', async () => {
      await sut.findAll()

      expect(mockCollection.find).toHaveBeenCalledTimes(1)
      expect(mockCollection.find).toHaveBeenCalledWith(
        {},
        { projection: { _id: 1, name: 1, party: 1, viceCandidate: 1, number: 1, createdAt: 1 } },
      )
    })

    it('should call candidatesCollection.find.toArray', async () => {
      await sut.findAll()

      expect(mockFindResponse.toArray).toHaveBeenCalledTimes(1)
      expect(mockFindResponse.toArray).toHaveBeenCalledWith()
    })

    it('should return correct values on success', async () => {
      const result = await sut.findAll()

      expect(result).toEqual([
        {
          id: mockedCandidate._id.toString(),
          name: mockedCandidate.name,
          party: mockedCandidate.party,
          viceCandidate: mockedCandidate.viceCandidate,
          number: mockedCandidate.number,
          createdAt: mockedCandidate.createdAt,
        },
      ])
    })
  })
})
