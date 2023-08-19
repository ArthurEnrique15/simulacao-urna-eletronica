import { Request, Response } from 'express'

import { IAddUser } from '@/domain/use-cases/add-user'

export class AddUserController {
  constructor(private readonly addUserUseCase: IAddUser) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    try {
      if (!name || !email || !password) {
        throw new Error('Missing param')
      }

      const user = await this.addUserUseCase.add({ name, email, password })

      if (!user) {
        throw new Error('User not created')
      }

      return response.status(201).json({ message: 'User created' })
    } catch (err) {
      const error = err as Error
      return response.status(400).json({ message: error.message })
    }
  }
}
