import bcrypt from 'bcrypt'

import { BcryptAdapter } from '.'

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter

  const salt = 12

  beforeAll(() => {
    sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hashed_value')
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true)
  })

  describe('hash', () => {
    it('should call hash with correct values', async () => {
      sut.hash('any_value')
      expect(bcrypt.hash).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return hash response', async () => {
      const response = sut.hash('any_value')
      expect(response).toEqual('hashed_value')
    })
  })

  describe('compare', () => {
    it('should call compare with correct values', async () => {
      sut.compare({ value: 'any_value', hash: 'any_hash' })
      expect(bcrypt.compare).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    it('should return true if compare returns true', async () => {
      const response = sut.compare({ value: 'any_value', hash: 'any_hash' })
      expect(response).toEqual(true)
    })

    it('should return false if compare returns false', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const response = sut.compare({ value: 'any_value', hash: 'any_hash' })
      expect(response).toEqual(false)
    })
  })
})
