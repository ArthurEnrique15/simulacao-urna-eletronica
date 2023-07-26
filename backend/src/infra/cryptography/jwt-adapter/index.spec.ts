import jwt from 'jsonwebtoken'

import { JwtAdapter } from '.'

describe('JwtAdapter', () => {
  let sut: JwtAdapter

  beforeAll(() => {
    sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'any_token')
  })

  describe('encrypt', () => {
    it('should call sign with correct values', async () => {
      sut.encrypt({ id: 'any_id' })
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    it('should return a token on sign success', async () => {
      const response = sut.encrypt({ id: 'any_id' })
      expect(response).toEqual('any_token')
    })
  })
})
