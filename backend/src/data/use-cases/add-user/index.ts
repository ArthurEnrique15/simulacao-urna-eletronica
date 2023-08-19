import { IPasswordHasher } from '@/data/protocols/cryptography/password-hasher'
import { IAddUserRepository } from '@/data/protocols/database/user/add-user'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/find-user-by-email'
import { AddUserDTO, IAddUser } from '@/domain/use-cases/add-user'

export class AddUser implements IAddUser {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly addUserRepository: IAddUserRepository,
  ) {}

  async add({ name, email, password }: AddUserDTO.Params): Promise<AddUserDTO.Result> {
    const userAlreadyExists = await this.findUserByEmailRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const hashedPassword = await this.passwordHasher.hash(password)

    const user = await this.addUserRepository.add({ name, email, password: hashedPassword })

    return user
  }
}
