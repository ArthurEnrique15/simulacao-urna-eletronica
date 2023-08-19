import { mock, MockProxy } from 'jest-mock-extended'

import { IDecrypter } from '@/data/protocols/cryptography/decrypter'
import { IFindCandidateByIdRepository } from '@/data/protocols/database/candidate/find-candidate-by-id'
import { IFindUserByIdRepository } from '@/data/protocols/database/user/find-user-by-id'
import { IAddUserVoteRepository } from '@/data/protocols/database/user-vote/add-user-vote'
import { IFindUserVoteByUserRepository } from '@/data/protocols/database/user-vote/find-by-user'
import { Candidate } from '@/domain/models/candidate'
import { User } from '@/domain/models/user'
import { AddUserVoteDTO } from '@/domain/use-cases/add-user-vote'

import { AddUserVote } from '.'

describe('AddUserVote', () => {
  let sut: AddUserVote
  let decrypter: MockProxy<IDecrypter>
  let findUserByIdRepository: MockProxy<IFindUserByIdRepository>
  let findCandidateByIdRepository: MockProxy<IFindCandidateByIdRepository>
  let findUserVoteByUserRepository: MockProxy<IFindUserVoteByUserRepository>
  let addUserVoteRepository: MockProxy<IAddUserVoteRepository>

  const validDecrypterResponse = { userId: 'any_user_id' }

  beforeEach(() => {
    decrypter = mock<IDecrypter>()
    findUserByIdRepository = mock<IFindUserByIdRepository>()
    findCandidateByIdRepository = mock<IFindCandidateByIdRepository>()
    findUserVoteByUserRepository = mock<IFindUserVoteByUserRepository>()
    addUserVoteRepository = mock<IAddUserVoteRepository>()
    sut = new AddUserVote(
      decrypter,
      findUserByIdRepository,
      findCandidateByIdRepository,
      findUserVoteByUserRepository,
      addUserVoteRepository,
    )

    decrypter.decrypt.mockResolvedValue({ userId: 'any_user_id' })
    findUserByIdRepository.findById.mockResolvedValue({ id: 'any_id', email: 'any_mail' } as User)
    findCandidateByIdRepository.findById.mockResolvedValue({ id: 'any_id', name: 'any_name' } as Candidate)
  })

  const validParams: AddUserVoteDTO.Params = {
    token: 'any_token',
    candidateId: 'any_candidate_id',
  }

  it('should call decrypter', async () => {
    await sut.add(validParams)

    expect(decrypter.decrypt).toBeCalledTimes(1)
    expect(decrypter.decrypt).toBeCalledWith(validParams.token)
  })

  it('should call findUserByIdRepository', async () => {
    await sut.add(validParams)

    expect(findUserByIdRepository.findById).toBeCalledTimes(1)
    expect(findUserByIdRepository.findById).toBeCalledWith(validDecrypterResponse.userId)
  })

  it('should throw if findUserByIdRepository returns null', async () => {
    findUserByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = sut.add(validParams)

    await expect(promise).rejects.toThrow(new Error('User not found'))
  })

  it('should call findCandidateByIdRepository', async () => {
    await sut.add(validParams)

    expect(findCandidateByIdRepository.findById).toBeCalledTimes(1)
    expect(findCandidateByIdRepository.findById).toBeCalledWith(validParams.candidateId)
  })

  it('should throw if findCandidateByIdRepository returns null', async () => {
    findCandidateByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = sut.add(validParams)

    await expect(promise).rejects.toThrow(new Error('Candidate not found'))
  })

  it('should call findUserVoteByUserRepository', async () => {
    await sut.add(validParams)

    expect(findUserVoteByUserRepository.findByUser).toBeCalledTimes(1)
    expect(findUserVoteByUserRepository.findByUser).toBeCalledWith(validDecrypterResponse.userId)
  })

  it('should throw if findUserVoteByUserRepository returns a user vote', async () => {
    findUserVoteByUserRepository.findByUser.mockResolvedValueOnce({
      id: 'any_id',
      userId: 'any_user_id',
      candidateId: 'any_candidate_id',
      date: new Date(),
    })

    const promise = sut.add(validParams)

    await expect(promise).rejects.toThrow(new Error('User already voted'))
  })

  it('should call addUserVoteRepository', async () => {
    await sut.add(validParams)

    expect(addUserVoteRepository.add).toBeCalledTimes(1)
    expect(addUserVoteRepository.add).toBeCalledWith({
      userId: validDecrypterResponse.userId,
      candidateId: validParams.candidateId,
    })
  })

  it('should return correct value on success', async () => {
    addUserVoteRepository.add.mockResolvedValueOnce(true)

    const result = await sut.add(validParams)

    expect(result).toEqual(true)
  })
})
