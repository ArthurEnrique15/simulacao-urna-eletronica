import jwt from 'jsonwebtoken'

import { IEncrypter } from '@/data/protocols/cryptography/encrypter'

export class JwtAdapter implements IEncrypter {
  constructor(private readonly secret: string) {}

  async encrypt(data: object): Promise<string> {
    return jwt.sign(data, this.secret)
  }
}
