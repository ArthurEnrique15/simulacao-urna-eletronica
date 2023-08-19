import { Request, Response } from 'express'

import { IAuthenticateUser } from '@/domain/use-cases/authenticate-user'

export class AuthenticateUserController {
  constructor(private readonly authenticateUserUseCase: IAuthenticateUser) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    try {
      if (!email || !password) {
        throw new Error('Missing param')
      }

      const result = await this.authenticateUserUseCase.authenticate({ email, password })

      return response.status(201).json(result)
    } catch (err) {
      const error = err as Error
      return response.status(400).json({ message: error.message })
    }
  }
}
