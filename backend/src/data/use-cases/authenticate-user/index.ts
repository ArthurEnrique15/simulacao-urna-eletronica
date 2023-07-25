import { IEncrypter } from '@/data/protocols/cryptography/encrypter'
import { IHashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/find-user-by-email'
import { AuthenticateUserDTO, IAuthenticateUser } from '@/domain/use-cases/authenticate-user'

export class AuthenticateUser implements IAuthenticateUser {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
  ) {}

  async authenticate({ email, password }: AuthenticateUserDTO.Params): Promise<AuthenticateUserDTO.Result> {
    const user = await this.findUserByEmailRepository.findByEmail(email)

    if (!user) {
      throw new Error('Wrong credentials')
    }

    const passwordMatch = await this.hashComparer.compare({ value: password, hash: user.password })

    if (!passwordMatch) {
      throw new Error('Wrong credentials')
    }

    const token = await this.encrypter.encrypt({ userId: user.id })

    return { token }
  }
}
