import { ObjectId } from 'mongodb'

import MongoHelper from '../helper'
import { UserRepository } from '.'

jest.mock('mongodb', () => {
  return {
    ObjectId: jest.fn(),
  }
})
jest.mock('../helper')

describe('UserRepository', () => {
  let sut: UserRepository

  const mockedUser = {
    _id: new ObjectId('some-id'),
    name: 'some_name',
    email: 'some_email',
    password: 'some_password',
  }

  const validInsertResponse = {
    insertedId: 'some-id',
  }

  const mockCollection = {
    insertOne: jest.fn().mockReturnValue(validInsertResponse),
    findOne: jest.fn().mockReturnValue(mockedUser),
  }

  beforeEach(() => {
    sut = new UserRepository()
    MongoHelper.getCollection = jest.fn().mockReturnValue(mockCollection)
  })

  describe('add', () => {
    const validAddParams = {
      name: 'any-name',
      email: 'any-email',
      password: 'any-password',
    }

    it('should call MongoHelper.getConnection with correct value', async () => {
      await sut.add(validAddParams)
      expect(MongoHelper.getCollection).toHaveBeenCalledWith('users')
    })

    it('should return true if user was inserted', async () => {
      const result = await sut.add(validAddParams)
      expect(result).toEqual(true)
    })

    it('should return false if user was not inserted', async () => {
      const mockCollectionWithNullInsertOne = {
        insertOne: jest.fn().mockReturnValueOnce({ insertedId: null }),
      }

      MongoHelper.getCollection = jest.fn().mockReturnValueOnce(mockCollectionWithNullInsertOne)
      const result = await sut.add(validAddParams)
      expect(result).toEqual(false)
    })
  })

  describe('findByEmail', () => {
    const validEmailParam = 'any-email'

    it('should call MongoHelper.getConnection with correct value', async () => {
      await sut.findByEmail(validEmailParam)
      expect(MongoHelper.getCollection).toHaveBeenCalledWith('users')
    })

    it('should call usersCollection.findOne with correct values', async () => {
      await sut.findByEmail(validEmailParam)
      expect(mockCollection.findOne).toHaveBeenCalledTimes(1)
      expect(mockCollection.findOne).toHaveBeenCalledWith(
        { email: validEmailParam },
        { projection: { _id: 1, name: 1, email: 1, password: 1 } },
      )
    })

    it('should return null if usersCollection.findOne returns null', async () => {
      const mockCollectionWithNullFindOne = {
        findOne: jest.fn().mockReturnValueOnce(null),
      }

      MongoHelper.getCollection = jest.fn().mockReturnValue(mockCollectionWithNullFindOne)

      const response = await sut.findByEmail('some-id')

      expect(response).toEqual(null)
    })

    it('should return correct user on success', async () => {
      const response = await sut.findByEmail('some-id')
      expect(response).toEqual({
        id: mockedUser._id.toString(),
        name: mockedUser.name,
        email: mockedUser.email,
        password: mockedUser.password,
      })
    })
  })

  describe('findById', () => {
    const validId = 'any-id'

    it('should call MongoHelper.getConnection with correct value', async () => {
      await sut.findById(validId)
      expect(MongoHelper.getCollection).toHaveBeenCalledWith('users')
    })

    it('should call usersCollection.findOne with correct values', async () => {
      await sut.findById(validId)
      expect(mockCollection.findOne).toHaveBeenCalledTimes(1)
      expect(mockCollection.findOne).toHaveBeenCalledWith(
        { _id: new ObjectId(validId) },
        { projection: { _id: 1, name: 1, email: 1, password: 1 } },
      )
    })

    it('should return null if usersCollection.findOne returns null', async () => {
      const mockCollectionWithNullFindOne = {
        findOne: jest.fn().mockReturnValueOnce(null),
      }

      MongoHelper.getCollection = jest.fn().mockReturnValue(mockCollectionWithNullFindOne)

      const response = await sut.findById('some-id')

      expect(response).toEqual(null)
    })

    it('should return correct user on success', async () => {
      const response = await sut.findById('some-id')
      expect(response).toEqual({
        id: mockedUser._id.toString(),
        name: mockedUser.name,
        email: mockedUser.email,
        password: mockedUser.password,
      })
    })
  })
})
