import { IEncrypter } from '@/data/protocols/cryptography/encrypter'
import { IAddUserRepository } from '@/data/protocols/database/user/add-user'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/find-user-by-email'
import { AddUserDTO, IAddUser } from '@/domain/use-cases/add-user'

export class AddUser implements IAddUser {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly encrypter: IEncrypter,
    private readonly addUserRepository: IAddUserRepository,
  ) {}

  async add({ email, password }: AddUserDTO.Params): Promise<AddUserDTO.Result> {
    const userAlreadyExists = await this.findUserByEmailRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const hashedPassword = await this.encrypter.encrypt(password)

    const user = await this.addUserRepository.add({ email, password: hashedPassword })

    return user
  }
}
