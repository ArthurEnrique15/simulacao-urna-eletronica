import { mock, MockProxy } from 'jest-mock-extended'

import { IFindAllUserVotesRepository } from '@/data/protocols/database/user-vote/find-all'

import { ListUsersVotes } from '.'

describe('ListUsersVotes', () => {
  let sut: ListUsersVotes
  let findAllUsersVotesRepository: MockProxy<IFindAllUserVotesRepository>

  const usersVotesMock = [
    {
      id: 'any_id_1',
      userId: 'user_id_1',
      candidateId: 'candidate_id_1',
      isBlank: false,
      createdAt: new Date(),
    },
    {
      id: 'any_id_2',
      userId: 'user_id_2',
      candidateId: 'candidate_id_2',
      isBlank: true,
      createdAt: new Date(),
    },
  ]

  beforeEach(() => {
    findAllUsersVotesRepository = mock<IFindAllUserVotesRepository>()

    sut = new ListUsersVotes(findAllUsersVotesRepository)

    findAllUsersVotesRepository.findAll.mockResolvedValue(usersVotesMock)
  })

  it('should call findAllUsersVotesRepository and return its response', async () => {
    await sut.list()

    expect(findAllUsersVotesRepository.findAll).toHaveBeenCalledTimes(1)
    expect(findAllUsersVotesRepository.findAll).toHaveBeenCalledWith()
  })

  it('should return findAllUsersVotesRepository response', async () => {
    const result = await sut.list()
    expect(result).toEqual(usersVotesMock)
  })
})
