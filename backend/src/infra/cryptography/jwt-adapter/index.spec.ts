import jwt from 'jsonwebtoken'

import { JwtAdapter } from '.'

describe('JwtAdapter', () => {
  let sut: JwtAdapter

  const validToken = 'any_token'
  const validDecryptedToken = { id: 'any_id' }

  beforeAll(() => {
    sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'sign').mockImplementation(() => validToken)
    jest.spyOn(jwt, 'verify').mockImplementation(() => validDecryptedToken)
  })

  describe('encrypt', () => {
    it('should call sign with correct values', async () => {
      await sut.encrypt({ id: 'any_id' })
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    it('should return a token on sign success', async () => {
      const response = await sut.encrypt({ id: 'any_id' })
      expect(response).toEqual(validToken)
    })
  })

  describe('decrypt', () => {
    it('should call verify with correct values', async () => {
      await sut.decrypt(validToken)
      expect(jwt.verify).toHaveBeenCalledWith(validToken, 'secret')
    })

    it('should return the decrypted token', async () => {
      const response = await sut.decrypt(validToken)
      expect(response).toEqual(validDecryptedToken)
    })
  })
})
