import { mock, MockProxy } from 'jest-mock-extended'

import { IPasswordHasher } from '@/data/protocols/cryptography/password-hasher'
import { IAddUserRepository } from '@/data/protocols/database/user/add-user'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/find-user-by-email'
import { User } from '@/domain/models/user'
import { AddUserDTO } from '@/domain/use-cases/add-user'

import { AddUser } from '.'

describe('AddUser', () => {
  let sut: AddUser
  let findUserByEmailRepository: MockProxy<IFindUserByEmailRepository>
  let passwordHasher: MockProxy<IPasswordHasher>
  let addUserRepository: MockProxy<IAddUserRepository>

  beforeEach(() => {
    findUserByEmailRepository = mock<IFindUserByEmailRepository>()
    passwordHasher = mock<IPasswordHasher>()
    addUserRepository = mock<IAddUserRepository>()
    sut = new AddUser(findUserByEmailRepository, passwordHasher, addUserRepository)
  })

  const validParams: AddUserDTO.Params = {
    email: 'any_email@mail.com',
    password: 'any_password',
  }

  it('should call findUserByEmailRepository', async () => {
    await sut.add(validParams)

    expect(findUserByEmailRepository.findByEmail).toBeCalledTimes(1)
    expect(findUserByEmailRepository.findByEmail).toBeCalledWith(validParams.email)
  })

  it('should throw if user already exists', async () => {
    findUserByEmailRepository.findByEmail.mockResolvedValueOnce({ id: 'any_id', email: '' } as User)

    const promise = sut.add(validParams)

    await expect(promise).rejects.toThrow(new Error('User already exists'))
  })

  it('should call passwordHasher with correct password', async () => {
    await sut.add(validParams)

    expect(passwordHasher.hash).toBeCalledTimes(1)
    expect(passwordHasher.hash).toBeCalledWith(validParams.password)
  })

  it('should call addUserRepository with correct values', async () => {
    passwordHasher.hash.mockResolvedValueOnce('hashed_password')

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
