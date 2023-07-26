import bcrypt from 'bcrypt'

import { BcryptAdapter } from '.'

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter

  const salt = 12

  beforeAll(() => {
    sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hashed_value')
  })

  describe('hash', () => {
    it('should call hash with correct values', async () => {
      sut.hash('any_value')
      expect(bcrypt.hash).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return a token on sign success', async () => {
      const response = sut.hash('any_value')
      expect(response).toEqual('hashed_value')
    })
  })
})
