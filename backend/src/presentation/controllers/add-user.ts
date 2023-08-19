import { Request, Response } from 'express'

import { IAddUser } from '@/domain/use-cases/add-user'

export class AddUserController {
  constructor(private readonly addUserUseCase: IAddUser) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    try {
      const user = await this.addUserUseCase.add({ email, password })

      if (!user) {
        throw new Error('User not created')
      }

      return response.status(201).json({ message: 'User created' })
    } catch (err) {
      console.log(err)
      return response.status(400).json({ error: err })
    }
  }
}
