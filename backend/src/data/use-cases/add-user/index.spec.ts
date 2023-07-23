import { mock, MockProxy } from 'jest-mock-extended'

import { IEncrypter } from '@/data/protocols/cryptography/encrypter'
import { IAddUserRepository } from '@/data/protocols/database/add-user'
import { IFindUserByEmailRepository } from '@/data/protocols/database/find-user-by-email'
import { User } from '@/domain/models/user'
import { AddUserDTO } from '@/domain/use-cases/add-user'

import { AddUser } from '.'

describe('AddUser', () => {
  let sut: AddUser
  let findUserByEmailRepository: MockProxy<IFindUserByEmailRepository>
  let encrypter: MockProxy<IEncrypter>
  let addUserRepository: MockProxy<IAddUserRepository>

  beforeEach(() => {
    findUserByEmailRepository = mock<IFindUserByEmailRepository>()
    encrypter = mock<IEncrypter>()
    addUserRepository = mock<IAddUserRepository>()
    sut = new AddUser(findUserByEmailRepository, encrypter, addUserRepository)
  })

  const validParams: AddUserDTO.Params = {
    email: 'any_email@mail.com',
    password: 'any_password',
  }

  it('should call findUserByEmailRepository', async () => {
    await sut.add(validParams)

    expect(findUserByEmailRepository.findUserByEmail).toBeCalledTimes(1)
    expect(findUserByEmailRepository.findUserByEmail).toBeCalledWith(validParams.email)
  })

  it('should throw if user already exists', async () => {
    findUserByEmailRepository.findUserByEmail.mockResolvedValueOnce({ id: 'any_id', email: '' } as User)

    const promise = sut.add(validParams)

    await expect(promise).rejects.toThrow(new Error('User already exists'))
  })

  it('should call encrypter with correct password', async () => {
    await sut.add(validParams)

    expect(encrypter.encrypt).toBeCalledTimes(1)
    expect(encrypter.encrypt).toBeCalledWith(validParams.password)
  })

  it('should call addUserRepository with correct values', async () => {
    encrypter.encrypt.mockResolvedValueOnce('hashed_password')

    await sut.add(validParams)

    expect(addUserRepository.add).toBeCalledTimes(1)
    expect(addUserRepository.add).toBeCalledWith({
      email: validParams.email,
      password: 'hashed_password',
    })
  })

  it('should return an user on success', async () => {
    addUserRepository.add.mockResolvedValueOnce({ id: 'any_id', email: '' } as User)

    const result = await sut.add(validParams)

    expect(result).toEqual({ id: 'any_id', email: '' })
  })
})
