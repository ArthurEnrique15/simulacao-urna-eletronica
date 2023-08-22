import { ObjectId } from 'mongodb'

import { AddUserRepositoryParams, IAddUserRepository } from '@/data/protocols/database/user/add-user'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/find-user-by-email'
import { IFindUserByIdRepository } from '@/data/protocols/database/user/find-user-by-id'
import { User } from '@/domain/models/user'

import MongoHelper from '../helper'

export class UserRepository implements IAddUserRepository, IFindUserByEmailRepository, IFindUserByIdRepository {
  async add(params: AddUserRepositoryParams): Promise<boolean> {
    const usersCollection = MongoHelper.getCollection('users')
    const result = await usersCollection.insertOne(params)
    return result.insertedId !== null
  }

  async findByEmail(email: string): Promise<User | null> {
    const usersCollection = MongoHelper.getCollection('users')
    const user = await usersCollection.findOne({ email }, { projection: { _id: 1, name: 1, email: 1, password: 1 } })

    if (!user) return null

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }

  async findById(id: string): Promise<User | null> {
    const usersCollection = MongoHelper.getCollection('users')
    const user = await usersCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 1, name: 1, email: 1, password: 1 } },
    )

    if (!user) return null

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }
}
