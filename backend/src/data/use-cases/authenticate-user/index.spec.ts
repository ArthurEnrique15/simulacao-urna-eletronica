import { mock, MockProxy } from 'jest-mock-extended'

import { IEncrypter } from '@/data/protocols/cryptography/encrypter'
import { IHashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/find-user-by-email'
import { User } from '@/domain/models/user'
import { AuthenticateUserDTO } from '@/domain/use-cases/authenticate-user'

import { AuthenticateUser } from '.'

describe('AuthenticateUser', () => {
  let sut: AuthenticateUser
  let findUserByEmailRepository: MockProxy<IFindUserByEmailRepository>
  let hashComparer: MockProxy<IHashComparer>
  let encrypter: MockProxy<IEncrypter>

  const userMock = {
    email: 'any_email',
    password: 'any_password',
  } as User

  beforeEach(() => {
    findUserByEmailRepository = mock<IFindUserByEmailRepository>()
    hashComparer = mock<IHashComparer>()
    encrypter = mock<IEncrypter>()

    sut = new AuthenticateUser(findUserByEmailRepository, hashComparer, encrypter)

    findUserByEmailRepository.findByEmail.mockResolvedValue(userMock)
    hashComparer.compare.mockResolvedValue(true)
  })

  const validParams: AuthenticateUserDTO.Params = {
    email: 'any_email',
    password: 'any_password',
  }

  it('should call findUserByEmailRepository', async () => {
    await sut.authenticate(validParams)

    expect(findUserByEmailRepository.findByEmail).toHaveBeenCalledTimes(1)
    expect(findUserByEmailRepository.findByEmail).toHaveBeenCalledWith(validParams.email)
  })

  it('should throw if user was not found', async () => {
    findUserByEmailRepository.findByEmail.mockResolvedValueOnce(null)

    const promise = sut.authenticate(validParams)

    await expect(promise).rejects.toThrow(new Error('Wrong credentials'))
  })

  it('should call hashComparer', async () => {
    await sut.authenticate(validParams)

    expect(hashComparer.compare).toHaveBeenCalledTimes(1)
    expect(hashComparer.compare).toHaveBeenCalledWith({ value: validParams.password, hash: userMock.password })
  })

  it('should throw if password does not match', async () => {
    hashComparer.compare.mockResolvedValueOnce(false)

    const promise = sut.authenticate(validParams)

    await expect(promise).rejects.toThrow(new Error('Wrong credentials'))
  })

  it('should call encrypter', async () => {
    await sut.authenticate(validParams)

    expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
    expect(encrypter.encrypt).toHaveBeenCalledWith({ userId: userMock.id })
  })

  it('should return a token on success', async () => {
    encrypter.encrypt.mockResolvedValueOnce('any_token')

    const result = await sut.authenticate(validParams)

    expect(result).toEqual({ token: 'any_token' })
  })
})
