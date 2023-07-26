import bcrypt from 'bcrypt'

import { HashComparerDTO, IHashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { IPasswordHasher } from '@/data/protocols/cryptography/password-hasher'

export class BcryptAdapter implements IPasswordHasher, IHashComparer {
  constructor(private readonly salt: number) {}

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt)
  }

  compare({ value, hash }: HashComparerDTO.Params): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
