import jwt from 'jsonwebtoken'

import { IDecrypter } from '@/data/protocols/cryptography/decrypter'
import { IEncrypter } from '@/data/protocols/cryptography/encrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(data: object): Promise<string> {
    return jwt.sign(data, this.secret)
  }

  async decrypt(token: string): Promise<any> {
    return jwt.verify(token, this.secret)
  }
}
