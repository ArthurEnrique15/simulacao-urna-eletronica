import { mock, MockProxy } from 'jest-mock-extended'

import { IFindAllCandidatesRepository } from '@/data/protocols/database/candidate/find-all'

import { ListCandidates } from '.'

describe('ListCandidates', () => {
  let sut: ListCandidates
  let findAllCandidatesRepository: MockProxy<IFindAllCandidatesRepository>

  const candidatesMock = [
    {
      id: 'any_id_1',
      name: 'any_name_1',
      party: 'any_party_1',
      viceCandidate: 'any_vice_1',
      number: 1,
      createdAt: new Date(),
    },
    {
      id: 'any_id_2',
      name: 'any_name_2',
      party: 'any_party_2',
      viceCandidate: 'any_vice_2',
      number: 2,
      createdAt: new Date(),
    },
  ]

  beforeEach(() => {
    findAllCandidatesRepository = mock<IFindAllCandidatesRepository>()

    sut = new ListCandidates(findAllCandidatesRepository)

    findAllCandidatesRepository.findAll.mockResolvedValue(candidatesMock)
  })

  it('should call findAllCandidatesRepository and return its response', async () => {
    await sut.list()

    expect(findAllCandidatesRepository.findAll).toHaveBeenCalledTimes(1)
    expect(findAllCandidatesRepository.findAll).toHaveBeenCalledWith()
  })

  it('should return findAllCandidatesRepository response', async () => {
    const result = await sut.list()
    expect(result).toEqual(candidatesMock)
  })
})
