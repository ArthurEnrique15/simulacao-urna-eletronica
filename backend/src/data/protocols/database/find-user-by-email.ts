import { User } from '@/domain/models/user'

export interface IFindUserByEmailRepository {
  findUserByEmail(email: string): Promise<User | null>
}
