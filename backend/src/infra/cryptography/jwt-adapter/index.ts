import jwt from 'jsonwebtoken'

import { IEncrypter } from '@/data/protocols/cryptography/encrypter'

export class JwtAdapter implements IEncrypter {
  constructor(private readonly secret: string) {}

  encrypt(data: object): string {
    return jwt.sign(data, this.secret)
  }
}
