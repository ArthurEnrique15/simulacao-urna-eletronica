import { AddUserRepositoryParams, IAddUserRepository } from '@/data/protocols/database/user/add-user'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/find-user-by-email'
import { IFindUserByIdRepository } from '@/data/protocols/database/user/find-user-by-id'
import { User } from '@/domain/models/user'

import MongoHelper from './helper'

export class UserRepository implements IAddUserRepository, IFindUserByEmailRepository, IFindUserByIdRepository {
  async add(params: AddUserRepositoryParams): Promise<boolean> {
    const usersCollection = MongoHelper.getCollection('users')
    const result = await usersCollection.insertOne(params)
    return result.insertedId !== null
  }

  async findByEmail(email: string): Promise<User | null> {
    const usersCollection = MongoHelper.getCollection('users')
    const user = await usersCollection.findOne({ email }, { projection: { _id: 1, name: 1, email: 1, password: 1 } })
    console.log(user)
    return user
  }

  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
}
