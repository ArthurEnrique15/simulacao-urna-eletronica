import { mock, MockProxy } from 'jest-mock-extended'

import { IFindCandidateByIdRepository } from '@/data/protocols/database/candidate/find-candidate-by-id'
import { IFindUserByIdRepository } from '@/data/protocols/database/user/find-user-by-id'
import { IAddUserVoteRepository } from '@/data/protocols/database/user-vote/add-user-vote'
import { IFindOneUserVoteRepository } from '@/data/protocols/database/user-vote/find-by-user'
import { Candidate } from '@/domain/models/candidate'
import { User } from '@/domain/models/user'
import { AddUserVoteDTO } from '@/domain/use-cases/add-user-vote'

import { AddUserVote } from '.'

describe('AddUserVote', () => {
  let sut: AddUserVote
  let findUserByIdRepository: MockProxy<IFindUserByIdRepository>
  let findCandidateByIdRepository: MockProxy<IFindCandidateByIdRepository>
  let findUserVoteRepository: MockProxy<IFindOneUserVoteRepository>
  let addUserVoteRepository: MockProxy<IAddUserVoteRepository>

  beforeEach(() => {
    findUserByIdRepository = mock<IFindUserByIdRepository>()
    findCandidateByIdRepository = mock<IFindCandidateByIdRepository>()
    findUserVoteRepository = mock<IFindOneUserVoteRepository>()
    addUserVoteRepository = mock<IAddUserVoteRepository>()
    sut = new AddUserVote(
      findUserByIdRepository,
      findCandidateByIdRepository,
      findUserVoteRepository,
      addUserVoteRepository,
    )

    findUserByIdRepository.findById.mockResolvedValue({ id: 'any_id', email: 'any_mail' } as User)
    findCandidateByIdRepository.findById.mockResolvedValue({ id: 'any_id', name: 'any_name' } as Candidate)
  })

  const validParams: AddUserVoteDTO.Params = {
    userId: 'any_user_id',
    candidateId: 'any_candidate_id',
  }

  it('should call findUserByIdRepository', async () => {
    await sut.add(validParams)

    expect(findUserByIdRepository.findById).toBeCalledTimes(1)
    expect(findUserByIdRepository.findById).toBeCalledWith(validParams.userId)
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

  it('should call findUserVoteRepository', async () => {
    await sut.add(validParams)

    expect(findUserVoteRepository.findOne).toBeCalledTimes(1)
    expect(findUserVoteRepository.findOne).toBeCalledWith({
      userId: validParams.userId,
      candidateId: validParams.candidateId,
    })
  })

  it('should throw if findUserVoteRepository returns a user vote', async () => {
    findUserVoteRepository.findOne.mockResolvedValueOnce({
      id: 'any_id',
      userId: 'any_user_id',
      candidateId: 'any_candidate_id',
      date: new Date(),
    })

    const promise = sut.add(validParams)

    await expect(promise).rejects.toThrow(new Error('User already voted in this candidate'))
  })

  it('should call addUserVoteRepository', async () => {
    await sut.add(validParams)

    expect(addUserVoteRepository.add).toBeCalledTimes(1)
    expect(addUserVoteRepository.add).toBeCalledWith(validParams)
  })

  it('should return a user vote on success', async () => {
    const mockedUserVote = {
      id: 'any_id',
      userId: 'any_user_id',
      candidateId: 'any_candidate_id',
      date: new Date(),
    }

    addUserVoteRepository.add.mockResolvedValueOnce(mockedUserVote)

    const result = await sut.add(validParams)

    expect(result).toEqual(mockedUserVote)
  })
})
